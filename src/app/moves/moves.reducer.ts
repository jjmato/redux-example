import { AppState } from './../app.reducer';
import * as fromMoves from './moves.actions';
import { Move } from './moves.model';

export interface MoveState {
  moves: Move[];
}

export interface AppState extends AppState {
  moves: MoveState;
}

const initState: MoveState = {
  moves: []
};

export function moveReducer(
  state = initState,
  action: fromMoves.actions
): MoveState {
  switch (action.type) {
    case fromMoves.SET_ITEMS:
      return {
        moves: [
          ...action.moves.map(move => {
            return { ...move };
          })
        ]
      } as MoveState;

    case fromMoves.UNSET_ITEMS:
      return { moves: [] } as MoveState;

    default:
      return state;
  }
}
