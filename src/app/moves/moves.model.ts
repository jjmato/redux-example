import { DocumentChangeAction } from '@angular/fire/firestore';

export interface Move {
  quantity: number;
  description: string;
  type: 'in' | 'out';
  uid: string;
}

export function createMove(params: Partial<Move>): Move {
  return {
    ...params
  } as Move;
}

/**
 * Partiendo de los cambios de Firebase construye un lista de moviemientos
 * @param docChange
 */
export function mapAfDocChangesToMoves(
  docChange: DocumentChangeAction<{}>[]
): Move[] {
  return docChange.map(doc => {
    return {
      uid: doc.payload.doc.id,
      ...doc.payload.doc.data()
    } as Move;
  });
}
