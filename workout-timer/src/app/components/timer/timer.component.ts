import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/reducers'; // Adjust path if AppState is elsewhere
import * as TimerActions from '../../store/timer/timer.actions';
import { selectTimeLeft, selectIsRunning, selectIsPaused, selectInitialDuration } from '../../store/timer/timer.reducer'; // Using selectors from reducer file

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  timeLeft$: Observable<number>;
  isRunning$: Observable<boolean>;
  isPaused$: Observable<boolean>;
  initialDuration$: Observable<number>;

  _initialDuration: number = 60; // Default, will be updated from store

  // SVG properties
  circumference = 2 * Math.PI * 45; // Radius of 45

  constructor(private store: Store<AppState>) {
    this.timeLeft$ = this.store.pipe(select(selectTimeLeft));
    this.isRunning$ = this.store.pipe(select(selectIsRunning));
    this.isPaused$ = this.store.pipe(select(selectIsPaused));
    this.initialDuration$ = this.store.pipe(select(selectInitialDuration));
  }

  ngOnInit(): void {
    this.initialDuration$.subscribe(duration => {
      this._initialDuration = duration;
      // Optional: Dispatch a reset action to initialize timer state if not done elsewhere
      // this.store.dispatch(TimerActions.resetTimer());
      // Or ensure initial timeLeft is set when initialDuration is first received
      // this.store.dispatch(TimerActions.timerTick({ timeLeft: duration }));
    });
     // Dispatch reset on init to set initial state based on reducer's initialDuration
    this.store.dispatch(TimerActions.resetTimer());
  }

  startTimer(): void {
    // Use the current _initialDuration from the component, which is synced from the store
    this.store.dispatch(TimerActions.startTimer({ initialDuration: this._initialDuration }));
  }

  pauseTimer(): void {
    this.store.dispatch(TimerActions.pauseTimer());
  }

  resetTimer(): void {
    this.store.dispatch(TimerActions.resetTimer());
  }

  get progressOffset(): Observable<number> {
    return this.timeLeft$.pipe(
      map(timeLeft => {
        if (timeLeft === this._initialDuration) { // Check against local _initialDuration synced from store
             // Consider if isRunning and isPaused should also be checked here for initial full circle display
             // For simplicity, if timeLeft matches initialDuration, show full circle (or empty based on desired visual)
             // This state (timeLeft === initialDuration) usually means timer is reset or not started
             // If you want a full circle before start, return 0 or circumference.
             // If you want it empty (like progress starting), then if timeLeft is initial, progress is 0.
             const isRunning = false; // Placeholder, ideally get from store if needed for this specific logic
             const isPaused = false; // Placeholder
             if (!isRunning && !isPaused && timeLeft === this._initialDuration) return this.circumference;
        }
        const progress = (this._initialDuration - timeLeft) / this._initialDuration;
        if (this._initialDuration === 0) return this.circumference; // Avoid division by zero
        return this.circumference * (1 - progress);
      })
    );
  }

  formatTime(seconds: number | null): string {
    if (seconds === null) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
