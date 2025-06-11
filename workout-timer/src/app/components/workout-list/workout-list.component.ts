import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/reducers';
import { Workout } from '../../store/workout/workout.model';
import * as WorkoutActions from '../../store/workout/workout.actions';
import { selectAllWorkouts, selectCurrentWorkoutId } from '../../store/workout/workout.selectors';
import { v4 as uuidv4 } from 'uuid'; // For generating IDs

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  workouts$: Observable<Workout[]>;
  selectedWorkoutId$: Observable<string | null>;

  // For a simple add form directly in this component
  showAddForm = false;
  newWorkoutName = '';

  constructor(private store: Store<AppState>) {
    this.workouts$ = this.store.pipe(select(selectAllWorkouts));
    this.selectedWorkoutId$ = this.store.pipe(select(selectCurrentWorkoutId));
  }

  ngOnInit(): void {
    // Optionally, load some initial data if not done elsewhere
    // This is mock data for now
    const mockWorkouts: Workout[] = [
      { id: uuidv4(), name: 'Morning Quick Fit', exercises: [{id: uuidv4(), name: 'Push-ups', duration: 30, type: 'work'}, {id: uuidv4(), name: 'Rest', duration: 15, type: 'rest'}, {id: uuidv4(), name: 'Squats', duration: 45, type: 'work'}] },
      { id: uuidv4(), name: 'Evening Stretch', exercises: [{id: uuidv4(), name: 'Yoga Pose 1', duration: 60, type: 'prepare'}, {id: uuidv4(), name: 'Deep Stretch', duration: 120, type: 'work'}] }
    ];
    this.store.dispatch(WorkoutActions.loadWorkouts({ workouts: mockWorkouts }));
  }

  selectWorkout(id: string): void {
    this.store.dispatch(WorkoutActions.selectWorkout({ id }));
  }

  deleteWorkout(id: string, event: Event): void {
    event.stopPropagation(); // Prevent selection when deleting
    if (confirm('Are you sure you want to delete this workout?')) {
      this.store.dispatch(WorkoutActions.deleteWorkout({ id }));
    }
  }

  addNewWorkout(): void {
    if (!this.newWorkoutName.trim()) return;
    const newWorkout: Workout = {
      id: uuidv4(), // Generate a unique ID
      name: this.newWorkoutName.trim(),
      exercises: [
        // Add a default 'prepare' exercise
        { id: uuidv4(), name: 'Prepare', duration: 10, type: 'prepare' },
        { id: uuidv4(), name: 'Work', duration: 30, type: 'work' },
        { id: uuidv4(), name: 'Rest', duration: 15, type: 'rest' }
      ]
    };
    this.store.dispatch(WorkoutActions.addWorkout({ workout: newWorkout }));
    this.newWorkoutName = '';
    this.showAddForm = false;
  }

  // Placeholder for edit functionality
  editWorkout(workout: Workout, event: Event): void {
    event.stopPropagation();
    alert('Edit functionality for "' + workout.name + '" is not fully implemented yet. We can extend workout-form for this.');
    // In a real app, you might set this workout as 'editingWorkout' in component state
    // and show a form (possibly workout-form component) pre-filled with its details.
  }
}
