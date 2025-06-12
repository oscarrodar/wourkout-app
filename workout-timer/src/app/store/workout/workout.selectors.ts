import { createFeatureSelector, createSelector } from '@ngrx/store';
import { workoutAdapter, WorkoutState, workoutFeatureKey } from './workout.reducer';
import { Workout, Exercise } from './workout.model'; // Ensure Exercise is imported if used directly in selectors

// Select the entire workout state
export const selectWorkoutFeatureState = createFeatureSelector<WorkoutState>(workoutFeatureKey);

// Get the selectors from the adapter
const {
  selectIds: selectWorkoutIdsInternal,
  selectEntities: selectWorkoutEntitiesInternal,
  selectAll: selectAllWorkoutsInternal,
  selectTotal: selectTotalWorkoutsInternal,
} = workoutAdapter.getSelectors();

// Expose the selectors
export const selectWorkoutIds = createSelector(selectWorkoutFeatureState, selectWorkoutIdsInternal);
export const selectWorkoutEntities = createSelector(selectWorkoutFeatureState, selectWorkoutEntitiesInternal);
export const selectAllWorkouts = createSelector(selectWorkoutFeatureState, selectAllWorkoutsInternal);
export const selectTotalWorkouts = createSelector(selectWorkoutFeatureState, selectTotalWorkoutsInternal);

export const selectCurrentWorkoutId = createSelector(
  selectWorkoutFeatureState,
  (state: WorkoutState) => state.selectedWorkoutId
);

export const selectCurrentWorkout = createSelector(
  selectWorkoutEntities,
  selectCurrentWorkoutId,
  (entities, workoutId) => workoutId && entities[workoutId] ? entities[workoutId] : null
);

// Selector for the first exercise of the selected workout (example for timer integration)
export const selectFirstExerciseOfCurrentWorkout = createSelector(
  selectCurrentWorkout,
  (workout: Workout | null): Exercise | null => {
    if (workout && workout.exercises && workout.exercises.length > 0) {
      return workout.exercises[0];
    }
    return null;
  }
);
