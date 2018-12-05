import { Move } from './moves.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortMoves'
})
export class SortMovesPipe implements PipeTransform {
  transform(moves: Move[]): Move[] {
    return moves.sort((move0, move1) => {
      return move0.type === 'in' ? -1 : 0;
    });
  }
}
