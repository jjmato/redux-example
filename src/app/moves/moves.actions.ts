import { actions } from './../shared/ui.actions';
import { Action } from '@ngrx/store';
import { Move } from './moves.model';

export const SET_ITEMS = '[MOVES] Set';
export const UNSET_ITEMS = '[MOVES] Unset';

export class SetMovesAction implements Action {
  readonly type = SET_ITEMS;
  constructor(public moves: Move[]) {}
}

export class UnsetMovesAction implements Action {
  readonly type = UNSET_ITEMS;
}

export type actions = SetMovesAction | UnsetMovesAction;
