import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Workout } from '../../store/workout/workout.model'; // Adjust path as needed

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit {
  @Input() workout: Workout | null = null; // For editing existing workout
  @Output() save = new EventEmitter<Partial<Workout>>(); // Emits workout data to save

  workoutName: string = '';
  // More fields for exercises would go here in a real form

  constructor() { }

  ngOnInit(): void {
    if (this.workout) {
      this.workoutName = this.workout.name;
    }
  }

  onSave(): void {
    if (!this.workoutName.trim()) return;
    // For a real form, gather all data
    const workoutData: Partial<Workout> = {
      name: this.workoutName,
      // exercises: ...
    };
    this.save.emit(workoutData);
  }
}
