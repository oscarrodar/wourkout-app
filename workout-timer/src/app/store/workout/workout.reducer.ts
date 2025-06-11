import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as WorkoutActions from './workout.actions';
import { Workout } from './workout.model';

export const workoutFeatureKey = 'workouts';

export interface WorkoutState extends EntityState<Workout> {
  selectedWorkoutId: string | null;
}

export const workoutAdapter: EntityAdapter<Workout> = createEntityAdapter<Workout>();

export const initialState: WorkoutState = workoutAdapter.getInitialState({
  selectedWorkoutId: null,
});

const internalWorkoutReducer = createReducer(
  initialState,
  on(WorkoutActions.addWorkout, (state, { workout }) => {
    return workoutAdapter.addOne(workout, state);
  }),
  on(WorkoutActions.updateWorkout, (state, { update }) => {
    return workoutAdapter.updateOne({id: update.id, changes: update.changes}, state);
  }),
  on(WorkoutActions.deleteWorkout, (state, { id }) => {
    return workoutAdapter.removeOne(id, state);
  }),
  on(WorkoutActions.loadWorkouts, (state, { workouts }) => {
    return workoutAdapter.setAll(workouts, state);
  }),
  on(WorkoutActions.selectWorkout, (state, { id }) => {
    return { ...state, selectedWorkoutId: id };
  })
);

export function workoutReducer(state: WorkoutState | undefined, action: Action) {
  return internalWorkoutReducer(state, action);
}
