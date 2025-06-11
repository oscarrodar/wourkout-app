import { createAction, props } from '@ngrx/store';

export const startTimer = createAction(
  '[Timer] Start Timer',
  props<{ initialDuration: number }>()
);

export const pauseTimer = createAction(
  '[Timer] Pause Timer'
);

export const resetTimer = createAction(
  '[Timer] Reset Timer'
);

export const timerTick = createAction(
  '[Timer] Timer Tick',
  props<{ timeLeft: number }>()
);

export const setTimerDuration = createAction(
  '[Timer] Set Timer Duration',
  props<{ duration: number }>()
);

export const timerDone = createAction(
  '[Timer] Timer Done'
);
