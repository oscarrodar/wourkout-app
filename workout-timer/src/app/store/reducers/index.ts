import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { WorkoutState, workoutReducer, workoutFeatureKey } from '../workout/workout.reducer';
import { TimerState, timerReducer, timerFeatureKey } from '../timer/timer.reducer';
import { environment } from '../../../environments/environment';

// Define your AppState interface
// This will be expanded as we add features
export interface AppState {
  [workoutFeatureKey]?: WorkoutState;
  timer?: TimerState;
  // Example:

}

// Define your initial reducers map
// This will also be expanded
export const reducers: ActionReducerMap<AppState> = {
  [workoutFeatureKey]: workoutReducer,
  [timerFeatureKey]: timerReducer,
  // Example:
  // feature: fromFeature.reducer,
};

// Meta-reducers can be used for things like logging
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
