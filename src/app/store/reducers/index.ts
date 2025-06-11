import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';

export interface AppState {
  // Add your state properties here
}

export const reducers: ActionReducerMap<AppState> = {
  // Add your reducers here
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
