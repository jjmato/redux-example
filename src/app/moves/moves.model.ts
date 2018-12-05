export interface Move {
  quantity: number;
  description: string;
  type: 'in' | 'out';
}

export function createMove(params: Partial<Move>): Move {
  return {
    ...params
  } as Move;
}
