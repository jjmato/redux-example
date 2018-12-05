import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromMoves from './moves/moves.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  ui: fromUI.State;
  auth: fromAuth.AuthState;
  moves: fromMoves.MoveState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  moves: fromMoves.moveReducer
};
