export interface Exercise {
  id: string; // Unique ID for the exercise step
  name: string;
  duration: number; // in seconds
  type: 'work' | 'rest' | 'prepare';
}

export interface Workout {
  id: string; // UUID
  name: string;
  description?: string;
  exercises: Exercise[];
}
