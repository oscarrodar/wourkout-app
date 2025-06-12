import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TimerService } from '../../services/timer.service';
import * as TimerActions from './timer.actions';
import { map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers'; // Assuming AppState is in root reducers
import { of } from 'rxjs';

@Injectable()
export class TimerEffects {
  constructor(
    private actions$: Actions,
    private timerService: TimerService,
    private store: Store<AppState>
  ) {}

  startTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimerActions.startTimer),
      switchMap(action => {
        // Effect should dispatch first tick immediately, then interval ticks
        const initialTickAction = TimerActions.timerTick({ timeLeft: action.initialDuration });

        return this.timerService.start(action.initialDuration).pipe(
          map(tick => TimerActions.timerTick({ timeLeft: tick.timeLeft })),
          takeUntil(this.actions$.pipe(ofType(TimerActions.pauseTimer, TimerActions.resetTimer))),
          // Prepend the initial tick
          // startWith(initialTickAction) // This was causing issues, let component handle initial state from reducer
        );
      })
    )
  );

  // Effect for when timer naturally concludes
  timerDone$ = createEffect(() =>
    this.timerService.timerDone$.pipe(
      map(() => TimerActions.timerDone())
    )
  );

  pauseTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimerActions.pauseTimer),
      tap(() => this.timerService.pause())
    ), { dispatch: false } // No action dispatched from here
  );

  resetTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimerActions.resetTimer),
      tap(() => this.timerService.reset())
      // Optionally dispatch an action to set timeLeft to initialDuration if not handled by reducer alone
      // map(() => TimerActions.timerTick({ timeLeft: get initial duration from store or service }))
    ), { dispatch: false } // Let reducer handle state update
  );
}
