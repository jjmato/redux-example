import { User } from './user.model';
import { Action } from '@ngrx/store';
export const SET_USER = '[AUTH] Set User';

export class SetUserAction implements Action {
  readonly type = SET_USER;

  constructor(public user?: User) {}
}

export type actions = SetUserAction;
