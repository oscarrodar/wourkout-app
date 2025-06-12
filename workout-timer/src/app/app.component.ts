import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // Update template to include the app-timer
  template: '<ion-app><ion-router-outlet></ion-router-outlet><app-timer></app-timer><app-workout-list></app-workout-list></ion-app>'
})
export class AppComponent {
  constructor() {}
}
