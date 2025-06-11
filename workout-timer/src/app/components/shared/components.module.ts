import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { WorkoutListComponent } from '../workout-list/workout-list.component';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Keep for conceptual completeness

import { TimerComponent } from '../timer/timer.component';

@NgModule({
  declarations: [TimerComponent, WorkoutListComponent, WorkoutFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    // IonicModule // Not actually available but good for structure
  ],
  exports: [TimerComponent, WorkoutListComponent, WorkoutFormComponent]
})
export class ComponentsModule {}
