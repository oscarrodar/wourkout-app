import { createAction, props } from '@ngrx/store';
import { Workout } from './workout.model';

export const addWorkout = createAction(
  '[Workout] Add Workout',
  props<{ workout: Workout }>()
);

export const updateWorkout = createAction(
  '[Workout] Update Workout',
  props<{ update: { id: string; changes: Partial<Workout> } }>() // Using NgRx entity update structure
);

export const deleteWorkout = createAction(
  '[Workout] Delete Workout',
  props<{ id: string }>()
);

export const loadWorkouts = createAction( // If we were loading from a source
  '[Workout] Load Workouts',
  props<{ workouts: Workout[] }>()
);

export const selectWorkout = createAction(
  '[Workout] Select Workout',
  props<{ id: string | null }>() // Allow null to deselect
);
