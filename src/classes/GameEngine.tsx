import { Dispatch, SetStateAction } from "react";
import { GameState } from "./GameState";

export class GameEngine {
  private static stepFromCmd = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };

  public static movePlayer(
    direction: string,
    game: GameState,
    setMoves: Dispatch<SetStateAction<number>>,
    setPushes: Dispatch<SetStateAction<number>>
  ) {
    const step = this.stepFromCmd[direction as "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown"];
    return this.movePlayerStep(game, step, setMoves, setPushes);
  }

  private static movePlayerStep(
    game: GameState,
    step: number[],
    setMoves: Dispatch<SetStateAction<number>>,
    setPushes: Dispatch<SetStateAction<number>>
  ) {
    let targetState = game.board[game.playerY + step[1]][game.playerX + step[0]];

    let moved = false;
    let boxMoved = false;
    if (targetState === 2 || targetState === 6) {
      boxMoved = this.moveBoxStep(game, game.playerY + step[1], game.playerX + step[0], step);
    }
    if (boxMoved || targetState === 0 || targetState === 4) {
      game.board[game.playerY + step[1]][game.playerX + step[0]] += 1;
      game.board[game.playerY][game.playerX] -= 1;
      moved = true;
    }

    if (moved) {
      game.playerX += step[0];
      game.playerY += step[1];
      game.nrMoves++;
      game.boxJustMoved = boxMoved;
      setMoves(val => val + 1);
      if (boxMoved) setPushes(val => val + 1);
    }
    return moved;
  }

  private static moveBoxStep(game: GameState, boxY: number, boxX: number, step: number[]): boolean {
    const targetState = game.board[boxY + step[1]][boxX + step[0]];
    if (targetState === 0 || targetState === 4) {
      game.board[boxY][boxX] -= 2;
      game.board[boxY + step[1]][boxX + step[0]] += 2;
      return true;
    }
    return false;
  }
}
