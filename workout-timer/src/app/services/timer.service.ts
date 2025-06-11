import { Injectable } from '@angular/core';
import { Subject, Subscription, interval, Observable, EMPTY } from 'rxjs';
import { takeWhile, map, startWith, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerSubscription: Subscription | undefined;
  private initialDuration: number = 0;
  public timeLeft$: Subject<number> = new Subject<number>();
  public timerDone$: Subject<void> = new Subject<void>();

  constructor() {}

  start(duration: number): Observable<{timeLeft: number} | null> {
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }
    this.initialDuration = duration;
    let currentTime = duration;

    return interval(1000).pipe(
      startWith(0), // Emit immediately to set initial time (or adjust logic)
      map((_, index) => {
        // First emission (index 0 from startWith) is immediate,
        // subsequent are from interval.
        // For startWith, use initial duration. For interval, decrement.
        if (index === 0 && duration > 0) { // initial tick after start
             // Special handling for initial tick if required, otherwise it's handled by timerTick action directly from effect
        } else if (currentTime > 0) {
             currentTime--;
        }
        return currentTime;
      }),
      tap(timeLeft => {
        this.timeLeft$.next(timeLeft);
        if (timeLeft <= 0) {
          this.timerDone$.next();
          if (this.timerSubscription) this.timerSubscription.unsubscribe();
        }
      }),
      takeWhile(timeLeft => timeLeft > 0, true), // include the 0 emission
      map(timeLeft => ({ timeLeft })) // Ensure it emits the object structure expected by effect
    );
  }

  pause(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  reset(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    // Resetting behavior might also involve emitting an initial state via timeLeft$ if needed
    // this.timeLeft$.next(this.initialDuration); // Or this could be handled by reducer
  }
}
