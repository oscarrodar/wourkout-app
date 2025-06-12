import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import * as WorkoutActions from './workout.actions';
import * as TimerActions from '../timer/timer.actions'; // Corrected path
import { selectFirstExerciseOfCurrentWorkout } from './workout.selectors';
import { map, switchMap, filter, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs'; // of is not used in the final effect, but good to keep if other effects might need it.

@Injectable()
export class WorkoutEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  // Effect to set timer duration when a workout is selected
  setTimerDurationOnWorkoutSelect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutActions.selectWorkout),
      filter(action => action.id !== null), // Only proceed if a workout is actually selected
      withLatestFrom(this.store.pipe(select(selectFirstExerciseOfCurrentWorkout))),
      // tap(([action, exercise]) => { // For debugging
      //   console.log('Workout selected action:', action);
      //   console.log('First exercise from store:', exercise);
      // }),
      filter(([_action, exercise]) => exercise !== null && exercise !== undefined), // _action to avoid unused variable warning
      map(([_action, exercise]) => { // _action to avoid unused variable warning
        // The filter above should ensure exercise is not null/undefined.
        // And exercise itself should have a duration property of type number.
        if (exercise && typeof exercise.duration === 'number') {
          return TimerActions.setTimerDuration({ duration: exercise.duration });
        }
        // This case should ideally not be reached due to the preceding filter.
        // If it is, it indicates an issue with data shape or selector logic.
        // Dispatching a specific "error" or "no-op" action can help in debugging.
        // However, NgRx will error if an action is dispatched that isn't handled
        // and doesn't have a corresponding reducer entry, unless {dispatch: false}.
        // A more robust approach for production might be to log an error and return EMPTY or an error action.
        console.warn('[WorkoutEffects] No valid exercise duration found for selected workout.');
        return { type: '[WorkoutEffects] NO_VALID_DURATION_FOUND_OR_ERROR' }; // This action type won't be handled
      }),
      // Filter out the placeholder/error action to prevent it from actually being dispatched
      // if we don't want NgRx to complain or if we don't have a handler for it.
      filter(action => action.type === TimerActions.setTimerDuration.type)
    )
  );

  // Example:
  // loadWorkouts$ = createEffect(() => this.actions$.pipe(
  //   ofType(WorkoutActions.loadWorkouts), // Hypothetical action if we were loading
  //   // switchMap(() => ... fetch data ... )
  //   // map(workouts => WorkoutActions.loadWorkoutsSuccess({ workouts }))
  // ));
}
