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
    const nextPlayerPos = { x: playerX, y: playerY };
    let modifiedBoard: number[][] = [[]];
    let boxMoved: boolean = false;

    switch (direction) {
      case "ArrowLeft":
        nextPlayerPos.x--;
        boxMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerLeft(
          playerY,
          playerX,
          currentBoard,
          setMoves,
          setPushes
        );
        break;
      case "ArrowRight":
        nextPlayerPos.x++;
        boxMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerRight(
          playerY,
          playerX,
          currentBoard,
          setMoves,
          setPushes
        );
        break;
      case "ArrowUp":
        nextPlayerPos.y--;
        boxMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerUp(
          playerY,
          playerX,
          currentBoard,
          setMoves,
          setPushes
        );
        break;
      case "ArrowDown":
        nextPlayerPos.y++;
        boxMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerDown(
          playerY,
          playerX,
          currentBoard,
          setMoves,
          setPushes
        );
        break;
      case "Backspace":
        console.log("back", game.backTrace.length);
        if (game.backTrace.length === 0) return currentBoard;
        let preStateInfo: number[] = game.backTrace.pop()!;
        currentBoard[preStateInfo[1]][preStateInfo[0]] += 1;
        currentBoard[preStateInfo[3]][preStateInfo[2]] -= 1;
        if (preStateInfo[4] >= 0) {
          //Resore box
          currentBoard[preStateInfo[3]][preStateInfo[2]] += 2;
          currentBoard[preStateInfo[5]][preStateInfo[4]] -= 2;
        }
        return currentBoard;
    }
    console.log(this.compareMatrix(modifiedBoard, game.board));
    console.log("modified board:", modifiedBoard);
    console.log("game board:", game.board);
    if (this.compareMatrix(modifiedBoard, game.board)) {
      let newBoxPosition = { x: -1, y: -1 };
      let playerPos: number[] = this.findPlayer(modifiedBoard);
      console.log(playerPos);
      let newPlayerX: number = playerPos[1];
      let newPlayerY: number = playerPos[0];
      //let boxMoved = (this.gameState.board[newState.playerY][newState.playerX] & 2) != 0;
      if (boxMoved) {
        newBoxPosition.x =
          playerX !== newPlayerX
            ? playerX < newPlayerX
              ? newPlayerX + 1
              : newPlayerX - 1
            : playerX;
        newBoxPosition.y =
          playerY !== newPlayerY
            ? playerY < newPlayerY
              ? newPlayerY + 1
              : newPlayerY - 1
            : playerY;
      }
      console.log(
        boxMoved,
        newBoxPosition.x,
        newBoxPosition.y,
        newPlayerX,
        newPlayerY,
        game.board[newPlayerY][newPlayerX]
      );
      game.backTrace.push([
        playerX,
        playerY,
        newPlayerX,
        newPlayerY,
        newBoxPosition.x,
        newBoxPosition.y,
      ]);
    }

    return currentBoard;
  }

  private static isBoxOnPos(board: number[][], pos: { x: number; y: number }) {
    return (
      0 <= pos.x &&
      pos.x < board[0].length &&
      0 <= pos.y &&
      pos.y < board.length &&
      (board[pos.y][pos.x] & 2) != 0
    );
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

  private static findPlayer(board: number[][]): number[] {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 1 || board[i][j] === 5) {
          return [i, j];
        }
      }
    }
    return [];
  }

  private static compareMatrix(
    matrix1: number[][],
    matrix2: number[][]
  ): boolean {
    if (matrix1.length !== matrix2.length) return false;
    for (let i = 0; i < matrix1.length; i++) {
      for (let j = 0; j < matrix1[i].length; j++) {
        if (matrix1[i][j] !== matrix2[i][j]) return false;
      }
    }

    return true;
  }
}
