import { Action } from '@ngrx/store';

export const ACTIVATE_LOADING = '[UI Loading] loading...';
export const DEACTIVATE_LOADING = '[UI Loading] loaded';

export class ActiveLoadingAction implements Action {
  readonly type = ACTIVATE_LOADING;
}
export class DeactiveLoadingAction implements Action {
  readonly type = DEACTIVATE_LOADING;
}
export type actions = ActiveLoadingAction | DeactiveLoadingAction;
