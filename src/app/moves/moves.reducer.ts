import { map, retry } from 'rxjs/operators';
import { Move } from './moves.model';
import * as fromMoves from './moves.actions';

export interface MoveState {
  moves: Move[];
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
