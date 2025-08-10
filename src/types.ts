export interface IRoom {
  board: number[][][];
  scoreMap: number[][];
  turn: 1 | 2;
  winner: 1 | 2 | null;
  players: string[];
  player1: string | null;
  player2: string | null;
  playerId: string;
  score: [number, number];
}