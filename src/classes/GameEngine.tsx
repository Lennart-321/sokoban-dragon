import { Dispatch, SetStateAction } from "react";
import { GameState } from "./GameState";

export class GameEngine {
  public static movePlayer(
    direction: string,
    game: GameState,
    setMoves: Dispatch<SetStateAction<number>>,
    setPushes: Dispatch<SetStateAction<number>>
  ) {
    let playerX = game.playerX;
    let playerY = game.playerY;
    let currentBoard = game.board;

    switch (direction) {
      case "ArrowLeft":
        return this.movePlayerLeft(
          playerY,
          playerX,
          currentBoard,
          setMoves,
          setPushes
        );
      case "ArrowRight":
        return this.movePlayerRight(
          playerY,
          playerX,
          currentBoard,
          setMoves,
          setPushes
        );
      case "ArrowUp":
        return this.movePlayerUp(
          playerY,
          playerX,
          currentBoard,
          setMoves,
          setPushes
        );
      case "ArrowDown":
        return this.movePlayerDown(
          playerY,
          playerX,
          currentBoard,
          setMoves,
          setPushes
        );
      default:
        return currentBoard;
    }
  }

  private static movePlayerLeft(
    playerY: number,
    playerX: number,
    currentBoard: number[][],
    setMoves: Dispatch<SetStateAction<number>>,
    setPushes: Dispatch<SetStateAction<number>>
  ) {
    let moveToIndex = currentBoard[playerY][playerX - 1];

    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[playerY][playerX - 1] += 1;
      currentBoard[playerY][playerX] -= 1;
      setMoves((val) => val + 1);
      return currentBoard;
    } else if (moveToIndex === 2 || moveToIndex === 6) {
      if (this.moveBox(currentBoard, playerY, playerX - 1, "left")) {
        currentBoard[playerY][playerX - 1] += 1;
        currentBoard[playerY][playerX] -= 1;
        setMoves((val) => val + 1);
        setPushes((val) => val + 1);
        return currentBoard;
      }
    }

    return currentBoard;
  }

  private static movePlayerRight(
    playerY: number,
    playerX: number,
    currentBoard: number[][],
    setMoves: Dispatch<SetStateAction<number>>,
    setPushes: Dispatch<SetStateAction<number>>
  ) {
    let moveToIndex = currentBoard[playerY][playerX + 1];

    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[playerY][playerX + 1] += 1;
      currentBoard[playerY][playerX] -= 1;
      setMoves((val) => val + 1);
      return currentBoard;
    } else if (moveToIndex === 2 || moveToIndex === 6) {
      if (this.moveBox(currentBoard, playerY, playerX + 1, "right")) {
        currentBoard[playerY][playerX + 1] += 1;
        currentBoard[playerY][playerX] -= 1;
        setMoves((val) => val + 1);
        setPushes((val) => val + 1);
        return currentBoard;
      }
    }

    return currentBoard;
  }

  private static movePlayerUp(
    playerY: number,
    playerX: number,
    currentBoard: number[][],
    setMoves: Dispatch<SetStateAction<number>>,
    setPushes: Dispatch<SetStateAction<number>>
  ) {
    let moveToIndex = currentBoard[playerY - 1][playerX];

    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[playerY - 1][playerX] += 1;
      currentBoard[playerY][playerX] -= 1;
      setMoves((val) => val + 1);

      return currentBoard;
    } else if (moveToIndex === 2 || moveToIndex === 6) {
      if (this.moveBox(currentBoard, playerY - 1, playerX, "up")) {
        currentBoard[playerY - 1][playerX] += 1;
        currentBoard[playerY][playerX] -= 1;
        setMoves((val) => val + 1);
        setPushes((val) => val + 1);
        return currentBoard;
      }
    }
    return currentBoard;
  }

  private static movePlayerDown(
    playerY: number,
    playerX: number,
    currentBoard: number[][],
    setMoves: Dispatch<SetStateAction<number>>,
    setPushes: Dispatch<SetStateAction<number>>
  ) {
    let moveToIndex = currentBoard[playerY + 1][playerX];

    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[playerY + 1][playerX] += 1;
      currentBoard[playerY][playerX] -= 1;
      setMoves((val) => val + 1);

      return currentBoard;
    } else if (moveToIndex === 2 || moveToIndex === 6) {
      if (this.moveBox(currentBoard, playerY + 1, playerX, "down")) {
        currentBoard[playerY + 1][playerX] += 1;
        currentBoard[playerY][playerX] -= 1;

        setMoves((val) => val + 1);
        setPushes((val) => val + 1);
        return currentBoard;
      }
    }

    return currentBoard;
  }

  private static moveBox(
    currentBoard: number[][],
    boxY: number,
    boxX: number,
    direction: string
  ) {
    if (direction === "right") {
      let moveToIndex = currentBoard[boxY][boxX + 1];
      return this.moveBoxRight(currentBoard, moveToIndex, boxY, boxX);
    } else if (direction === "down") {
      let moveToIndex = currentBoard[boxY + 1][boxX];
      return this.moveBoxDown(currentBoard, moveToIndex, boxY, boxX);
    } else if (direction === "up") {
      let moveToIndex = currentBoard[boxY - 1][boxX];
      return this.moveBoxUp(currentBoard, moveToIndex, boxY, boxX);
    } else if (direction === "left") {
      let moveToIndex = currentBoard[boxY][boxX - 1];
      return this.moveBoxLeft(currentBoard, moveToIndex, boxY, boxX);
    }
  }

  private static moveBoxDown(
    currentBoard: number[][],
    moveToIndex: number,
    boxY: number,
    boxX: number
  ): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[boxY][boxX] -= 2;
      currentBoard[boxY + 1][boxX] += 2;
      return true;
    }
    return false;
  }

  private static moveBoxUp(
    currentBoard: number[][],
    moveToIndex: number,
    boxY: number,
    boxX: number
  ): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[boxY][boxX] -= 2;
      currentBoard[boxY - 1][boxX] += 2;
      return true;
    }
    return false;
  }

  private static moveBoxLeft(
    currentBoard: number[][],
    moveToIndex: number,
    boxY: number,
    boxX: number
  ): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[boxY][boxX] -= 2;
      currentBoard[boxY][boxX - 1] += 2;
      return true;
    }
    return false;
  }

  private static moveBoxRight(
    currentBoard: number[][],
    moveToIndex: number,
    boxY: number,
    boxX: number
  ): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[boxY][boxX] -= 2;
      currentBoard[boxY][boxX + 1] += 2;
      return true;
    }
    return false;
  }
}
