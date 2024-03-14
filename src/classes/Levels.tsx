import { GameState } from "./GameState";

export class Levels {
  static levels: number[][][] = [
    [
      [8, 8, 8, 8, 8, 8],
      [8, 4, 0, 0, 0, 8],
      [8, 2, 0, 4, 0, 8],
      [8, 1, 0, 6, 0, 8],
      [8, 0, 0, 4, 0, 8],
      [8, 0, 0, 0, 0, 8],
      [8, 8, 8, 8, 8, 8],
    ],
  ];
  public static getGameState(index: number) {
    const newBoard: number[][] = [];
    const oldBoard: number[][] = Levels.levels[index];
    for (let i = 0; i < oldBoard.length; i++) {
      newBoard.push(oldBoard[i].slice());
    }
    let gameState = new GameState(newBoard);

    return gameState;
  }
}
