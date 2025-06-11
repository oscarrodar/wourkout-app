import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as TimerActions from './timer.actions';

export const timerFeatureKey = 'timer';

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  timeLeft: number;
  initialDuration: number;
}

export const initialState: TimerState = {
  isRunning: false,
  isPaused: false,
  timeLeft: 0,
  initialDuration: 60, // Default initial duration
};

const internalTimerReducer = createReducer(
  initialState,
  on(TimerActions.startTimer, (state, { initialDuration }) => ({
    ...state,
    isRunning: true,
    isPaused: false,
    timeLeft: initialDuration,
    initialDuration: initialDuration,
  })),
  on(TimerActions.pauseTimer, (state) => ({
    ...state,
    isRunning: false,
    isPaused: true,
  })),
  on(TimerActions.resetTimer, (state) => ({
    ...state,
    isRunning: false,
    isPaused: false,
    timeLeft: state.initialDuration,
  })),
  on(TimerActions.timerTick, (state, { timeLeft }) => ({
    ...state,
    timeLeft: timeLeft,
  })),
  on(TimerActions.setTimerDuration, (state, { duration }) => ({
    ...initialState, // Reset to initial state but with new duration
    initialDuration: duration,
    timeLeft: duration,
    isRunning: false,
    isPaused: false,
  })),

  on(TimerActions.timerDone, (state) => ({
    ...state,
    isRunning: false,
    isPaused: false,
    // timeLeft: 0 // Optionally reset to 0 or keep last value based on preference
  }))
);

export function timerReducer(state: TimerState | undefined, action: Action) {
  return internalTimerReducer(state, action);
}

// Selectors
export const selectTimerState = createFeatureSelector<TimerState>(timerFeatureKey);

export const selectTimeLeft = createSelector(
  selectTimerState,
  (state) => state.timeLeft
);

export const selectIsRunning = createSelector(
  selectTimerState,
  (state) => state.isRunning
);

export const selectIsPaused = createSelector(
  selectTimerState,
  (state) => state.isPaused
);

export const selectInitialDuration = createSelector(
  selectTimerState,
  (state) => state.initialDuration
);
