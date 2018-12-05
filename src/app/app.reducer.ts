import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import * as fromUI from './shared/ui.reducer';

export interface AppState {
  ui: fromUI.State;
  auth: fromAuth.AuthState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
};
