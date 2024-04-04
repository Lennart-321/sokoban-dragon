import { GameState } from "./GameState";

export class Levels {
  static levels: number[][][] = [
    [
      [8, 8, 8, 8, 8, 8],
      [8, 4, 0, 0, 0, 8],
      [8, 2, 2, 4, 0, 8],
      [8, 1, 0, 6, 0, 8],
      [8, 0, 2, 4, 0, 8],
      [8, 0, 0, 0, 0, 8],
      [8, 8, 8, 8, 8, 8],
    ],
    [
      [8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 1, 8, 0, 8],
      [8, 8, 8, 2, 4, 0, 8],
      [8, 0, 2, 0, 0, 0, 8],
      [8, 0, 4, 0, 2, 4, 8],
      [8, 0, 0, 0, 0, 0, 8],
      [8, 8, 8, 8, 8, 8, 8],
    ],
    [
      [8, 8, 8, 8, 8],
      [8, 4, 1, 0, 8],
      [8, 2, 2, 8, 8],
      [8, 0, 0, 0, 8],
      [8, 0, 2, 0, 8],
      [8, 0, 0, 8, 8],
      [8, 0, 8, 8, 8],
      [8, 4, 0, 8, 8],
      [8, 4, 0, 8, 8],
      [8, 8, 8, 8, 8],
    ],
    [
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 0, 0, 8, 8, 8, 8, 8],
      [8, 8, 8, 0, 2, 8, 8, 8, 0, 8],
      [8, 8, 8, 0, 0, 0, 0, 2, 1, 8],
      [8, 8, 8, 8, 0, 8, 0, 2, 0, 8],
      [8, 0, 2, 0, 4, 0, 0, 4, 0, 8],
      [8, 0, 4, 0, 0, 4, 0, 0, 0, 8],
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    ],
    [
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 0, 0, 0, 0, 0, 0, 0, 8],
      [8, 0, 0, 0, 2, 2, 0, 2, 1, 8],
      [8, 0, 2, 8, 0, 0, 4, 8, 8, 8],
      [8, 0, 4, 8, 8, 8, 8, 8, 8, 8],
      [8, 0, 4, 8, 8, 8, 8, 8, 8, 8],
      [8, 0, 4, 8, 0, 8, 0, 8, 8, 8],
      [8, 0, 0, 2, 4, 0, 0, 0, 0, 8],
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    ],
    [
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9],
      [8, 4, 4, 0, 0, 8, 0, 0, 0, 0, 0, 8, 8, 8],
      [8, 4, 4, 0, 0, 8, 0, 2, 0, 0, 2, 0, 0, 8],
      [8, 4, 4, 0, 0, 8, 2, 8, 8, 8, 8, 0, 0, 8],
      [8, 4, 4, 0, 0, 0, 0, 1, 0, 8, 8, 0, 0, 8],
      [8, 4, 4, 0, 0, 8, 0, 8, 0, 0, 2, 0, 8, 8],
      [8, 8, 8, 8, 8, 8, 0, 8, 8, 2, 0, 2, 0, 8],
      [9, 9, 8, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 8],
      [9, 9, 8, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 8],
      [9, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    ],
    [
      [8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 0, 0, 0, 8, 8],
      [8, 4, 1, 2, 0, 0, 8, 8],
      [8, 8, 8, 0, 2, 4, 8, 8],
      [8, 4, 8, 8, 2, 0, 8, 8],
      [8, 0, 8, 0, 4, 0, 8, 8],
      [8, 2, 0, 6, 2, 2, 4, 8],
      [8, 0, 0, 0, 4, 0, 0, 8],
      [8, 8, 8, 8, 8, 8, 8, 8],
    ],
    [
      [9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8, 9],
      [9, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 8, 8],
      [8, 8, 0, 8, 0, 1, 8, 8, 0, 2, 2, 0, 8],
      [8, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 8],
      [8, 0, 0, 2, 0, 0, 8, 8, 8, 0, 0, 0, 8],
      [8, 8, 8, 0, 8, 8, 8, 8, 8, 2, 8, 8, 8],
      [8, 0, 2, 0, 0, 8, 8, 8, 0, 4, 4, 8, 9],
      [8, 0, 2, 0, 2, 0, 2, 0, 4, 4, 4, 8, 9],
      [8, 0, 0, 0, 0, 8, 8, 8, 4, 4, 4, 8, 9],
      [8, 0, 2, 2, 0, 8, 9, 8, 4, 4, 4, 8, 9],
      [8, 0, 0, 8, 8, 8, 9, 8, 8, 8, 8, 8, 9],
      [8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    ],
    [
      [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 0, 0, 0, 8, 8, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 0, 0, 0, 0, 0, 8, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 0, 0, 2, 2, 0, 0, 8, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 8, 8, 0, 2, 2, 0, 0, 2, 0, 8, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 8, 0, 2, 0, 0, 0, 0, 2, 0, 8, 9, 9, 9],
      [8, 8, 8, 8, 9, 9, 9, 8, 0, 0, 0, 2, 2, 0, 8, 8, 8, 8, 8, 9],
      [8, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 8, 8, 0, 0, 0, 0, 8, 9],
      [8, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 8, 9],
      [8, 4, 8, 0, 8, 8, 8, 8, 8, 8, 8, 0, 8, 8, 0, 0, 0, 8, 8, 9],
      [8, 4, 8, 0, 8, 8, 8, 8, 8, 8, 8, 4, 0, 8, 2, 0, 2, 8, 8, 8],
      [8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 8, 0, 0, 0, 2, 0, 8],
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 2, 0, 0, 8],
      [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 0, 0, 8, 8, 8],
      [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 9, 9],
    ],
    [
      [9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 9, 9, 9, 9, 9],
      [9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 8, 8, 9, 9, 9, 9],
      [8, 8, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 8, 8, 8, 8, 8],
      [8, 0, 0, 0, 8, 8, 0, 8, 8, 0, 0, 0, 8, 8, 4, 4, 4, 8],
      [8, 0, 8, 2, 2, 0, 2, 0, 2, 2, 8, 2, 8, 8, 4, 4, 4, 8],
      [8, 0, 8, 0, 0, 0, 0, 1, 0, 0, 8, 0, 0, 0, 4, 4, 4, 8],
      [8, 0, 0, 2, 8, 0, 8, 8, 8, 2, 2, 0, 0, 0, 4, 4, 4, 8],
      [8, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 8, 8, 4, 4, 4, 4, 8],
      [8, 8, 8, 2, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8],
      [9, 9, 8, 0, 0, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9],
      [9, 9, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    ],
    [
      [9, 9, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      [9, 9, 9, 8, 0, 0, 8, 8, 8, 0, 0, 0, 8],
      [9, 9, 9, 8, 0, 2, 0, 0, 0, 2, 0, 0, 8],
      [9, 9, 9, 8, 0, 0, 8, 8, 8, 8, 2, 8, 8],
      [9, 9, 9, 8, 8, 0, 8, 0, 0, 8, 0, 0, 8],
      [9, 9, 8, 8, 0, 0, 8, 4, 6, 0, 0, 0, 8],
      [9, 9, 8, 0, 0, 8, 8, 4, 4, 8, 0, 0, 8],
      [9, 9, 8, 0, 1, 0, 8, 4, 6, 8, 0, 8, 8],
      [9, 9, 8, 0, 8, 2, 8, 4, 4, 8, 2, 0, 8],
      [9, 9, 8, 0, 2, 0, 8, 4, 4, 8, 0, 0, 8],
      [9, 9, 8, 0, 8, 0, 8, 6, 6, 8, 0, 0, 8],
      [9, 9, 8, 0, 2, 0, 8, 4, 4, 8, 2, 8, 8],
      [9, 9, 8, 0, 0, 0, 0, 4, 6, 8, 0, 0, 8],
      [9, 8, 8, 8, 0, 0, 8, 0, 0, 8, 0, 0, 8],
      [8, 8, 0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 8],
      [8, 0, 0, 8, 8, 8, 8, 8, 8, 8, 2, 8, 8],
      [8, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 8],
      [8, 0, 0, 8, 8, 0, 0, 0, 8, 0, 0, 0, 8],
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    ],

    // prettier-ignore
    // [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 0, 0, 8, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 8, 0, 0, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 8, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 8, 8, 0, 0, 2, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 8, 8, 8, 0, 2, 8, 0, 8, 0, 0, 8, 0, 8, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    //   [0, 0, 8, 0, 0, 2, 0, 0, 8, 0, 0, 2, 8, 0, 8, 0, 2, 2, 0, 8, 0, 0, 0, 8, 0, 8, 0, 0, 8],
    //   [0, 8, 8, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 8, 8, 0, 0, 0, 0, 2, 0, 8, 0, 8, 0, 0, 8],
    //   [0, 8, 0, 0, 8, 2, 0, 0, 0, 8, 0, 8, 8, 8, 0, 0, 8, 0, 0, 8, 0, 2, 2, 8, 0, 8, 0, 0, 8],
    //   [0, 8, 0, 0, 0, 0, 2, 8, 8, 0, 0, 0, 0, 8, 0, 0, 0, 8, 8, 0, 2, 0, 0, 8, 0, 8, 0, 8, 8],
    //   [8, 8, 8, 8, 2, 0, 2, 0, 8, 0, 0, 0, 0, 8, 8, 0, 0, 8, 0, 0, 0, 2, 0, 0, 0, 0, 4, 4, 8],
    //   [8, 0, 0, 8, 0, 0, 0, 0, 8, 8, 8, 0, 8, 0, 2, 0, 2, 0, 8, 8, 8, 0, 0, 8, 8, 8, 4, 6, 8],
    //   [8, 0, 0, 0, 0, 0, 8, 8, 0, 0, 2, 2, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 8, 8, 4, 4, 4, 4, 8],
    //   [8, 0, 0, 8, 8, 0, 0, 8, 8, 0, 0, 0, 2, 0, 0, 8, 2, 8, 0, 0, 8, 8, 4, 4, 4, 4, 6, 4, 8],
    //   [8, 8, 0, 8, 0, 0, 2, 0, 0, 8, 0, 8, 0, 2, 8, 8, 0, 0, 8, 8, 4, 4, 4, 4, 6, 4, 8, 8, 8],
    //   [8, 8, 0, 8, 8, 0, 0, 2, 0, 0, 8, 0, 2, 0, 8, 0, 0, 8, 4, 4, 4, 4, 6, 4, 8, 8, 8, 0, 0],
    //   [8, 0, 0, 0, 0, 2, 0, 8, 8, 8, 8, 0, 0, 0, 8, 0, 4, 4, 4, 4, 6, 4, 8, 8, 8, 0, 0, 0, 0],
    //   [8, 0, 0, 0, 8, 0, 0, 8, 0, 0, 8, 0, 0, 8, 0, 0, 4, 4, 6, 4, 8, 8, 8, 0, 0, 0, 0, 0, 0],
    //   [8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0],
    // ],
  ];
  public static getGameState(index: number) {
    const newBoard: number[][] = [];
    const oldBoard: number[][] = Levels.levels[index];
    for (let i = 0; i < oldBoard.length; i++) {
      newBoard.push(oldBoard[i].slice());
    }
    let gameState = new GameState(newBoard, index);

    return gameState;
  }
}
