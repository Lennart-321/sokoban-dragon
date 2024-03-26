import { Dispatch, SetStateAction } from "react";
import { GameState } from "./GameState";

export class GameEngine {
  public static movePlayer(direction: string, game: GameState) {
    let oldPlayerX = game.playerX;
    let oldPlayerY = game.playerY;
    game.boxJustMoved = false;

    switch (direction) {
      case "ArrowLeft":
        this.movePlayerLeft(game);
        break;
      case "ArrowRight":
        this.movePlayerRight(game);
        break;
      case "ArrowUp":
        this.movePlayerUp(game);
        break;
      case "ArrowDown":
        this.movePlayerDown(game);
        break;
      case "Backspace":
        if (game.backTrace.length === 0) return false;
        let preStateInfo: number[] = game.backTrace.pop()!;
        game.board[preStateInfo[1]][preStateInfo[0]] += 1;
        game.board[preStateInfo[3]][preStateInfo[2]] -= 1;
        if (preStateInfo[4] >= 0) {
          //Resore box
          game.board[preStateInfo[3]][preStateInfo[2]] += 2;
          game.board[preStateInfo[5]][preStateInfo[4]] -= 2;
          game.boxJustMoved = true;
        }
        game.playerX = preStateInfo[0];
        game.playerY = preStateInfo[1];
        game.backSteps++;
        return true;
    }

    if (game.playerX !== oldPlayerX || game.playerY !== oldPlayerY) {
      let newBoxPositionX = -1,
        newBoxPositionY = -1;
      if (game.boxJustMoved) {
        newBoxPositionX =
          oldPlayerX !== game.playerX ? (oldPlayerX < game.playerX ? game.playerX + 1 : game.playerX - 1) : oldPlayerX;
        newBoxPositionY =
          oldPlayerY !== game.playerY ? (oldPlayerY < game.playerY ? game.playerY + 1 : game.playerY - 1) : oldPlayerY;
      }
      game.backTrace.push([oldPlayerX, oldPlayerY, game.playerX, game.playerY, newBoxPositionX, newBoxPositionY]);

      this.gameOver(game); // Check for game over
      return true;
    }

    return false;
  }

  private static gameOver(game: GameState) {
    let emptyTarget = false;

    for (let y = 0; y < game.board.length; y++) {
      for (let x = 0; x < game.board[y].length; x++) {
        if (game.board[y][x] === 4 || game.board[y][x] === 5) {
          // 4=target, 5=man+target
          emptyTarget = true;
          break;
        }
      }
    }

    if (!emptyTarget) {
      // No empty target => game over
      game.stopRunning();
    }
  }

  // private static isBoxOnPos(board: number[][], pos: { x: number; y: number }) {
  //   return (
  //     0 <= pos.x && pos.x < board[0].length && 0 <= pos.y && pos.y < board.length && (board[pos.y][pos.x] & 2) != 0
  //   );
  // }

  private static movePlayerLeft(game: GameState) {
    let moveToIndex = game.board[game.playerY][game.playerX - 1];

    if (moveToIndex === 0 || moveToIndex === 4) {
      game.board[game.playerY][game.playerX - 1] += 1;
      game.board[game.playerY][game.playerX] -= 1;
      game.incMoves();
      game.playerX--;
    } else if (moveToIndex === 2 || moveToIndex === 6) {
      if (this.moveBox(game.board, game.playerY, game.playerX - 1, "left")) {
        game.board[game.playerY][game.playerX - 1] += 1;
        game.board[game.playerY][game.playerX] -= 1;
        game.incMoves();
        game.incPushes();
        game.playerX--;
        game.boxJustMoved = true;
      }
    }
  }

  private static movePlayerRight(game: GameState) {
    let moveToIndex = game.board[game.playerY][game.playerX + 1];

    if (moveToIndex === 0 || moveToIndex === 4) {
      game.board[game.playerY][game.playerX + 1] += 1;
      game.board[game.playerY][game.playerX] -= 1;
      game.incMoves();
      game.playerX++;
    } else if (moveToIndex === 2 || moveToIndex === 6) {
      if (this.moveBox(game.board, game.playerY, game.playerX + 1, "right")) {
        game.board[game.playerY][game.playerX + 1] += 1;
        game.board[game.playerY][game.playerX] -= 1;
        game.incMoves();
        game.incPushes();
        game.playerX++;
        game.boxJustMoved = true;
      }
    }
  }

  private static movePlayerUp(game: GameState) {
    let moveToIndex = game.board[game.playerY - 1][game.playerX];

    if (moveToIndex === 0 || moveToIndex === 4) {
      game.board[game.playerY - 1][game.playerX] += 1;
      game.board[game.playerY][game.playerX] -= 1;
      game.incMoves();
      game.playerY--;
    } else if (moveToIndex === 2 || moveToIndex === 6) {
      if (this.moveBox(game.board, game.playerY - 1, game.playerX, "up")) {
        game.board[game.playerY - 1][game.playerX] += 1;
        game.board[game.playerY][game.playerX] -= 1;
        game.incMoves();
        game.incPushes();
        game.playerY--;
        game.boxJustMoved = true;
      }
    }
  }

  private static movePlayerDown(game: GameState) {
    let moveToIndex = game.board[game.playerY + 1][game.playerX];

    if (moveToIndex === 0 || moveToIndex === 4) {
      game.board[game.playerY + 1][game.playerX] += 1;
      game.board[game.playerY][game.playerX] -= 1;
      game.incMoves();
      game.playerY++;
    } else if (moveToIndex === 2 || moveToIndex === 6) {
      if (this.moveBox(game.board, game.playerY + 1, game.playerX, "down")) {
        game.board[game.playerY + 1][game.playerX] += 1;
        game.board[game.playerY][game.playerX] -= 1;
        game.incMoves();
        game.incPushes();
        game.playerY++;
        game.boxJustMoved = true;
      }
    }
  }

  private static moveBox(currentBoard: number[][], boxY: number, boxX: number, direction: string) {
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

  private static moveBoxDown(currentBoard: number[][], moveToIndex: number, boxY: number, boxX: number): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[boxY][boxX] -= 2;
      currentBoard[boxY + 1][boxX] += 2;
      return true;
    }
    return false;
  }

  private static moveBoxUp(currentBoard: number[][], moveToIndex: number, boxY: number, boxX: number): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[boxY][boxX] -= 2;
      currentBoard[boxY - 1][boxX] += 2;
      return true;
    }
    return false;
  }

  private static moveBoxLeft(currentBoard: number[][], moveToIndex: number, boxY: number, boxX: number): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[boxY][boxX] -= 2;
      currentBoard[boxY][boxX - 1] += 2;
      return true;
    }
    return false;
  }

  private static moveBoxRight(currentBoard: number[][], moveToIndex: number, boxY: number, boxX: number): boolean {
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

  private static compareMatrix(matrix1: number[][], matrix2: number[][]): boolean {
    if (matrix1.length !== matrix2.length) return false;
    for (let i = 0; i < matrix1.length; i++) {
      for (let j = 0; j < matrix1[i].length; j++) {
        if (matrix1[i][j] !== matrix2[i][j]) return false;
      }
    }

    return true;
  }

  public static lastDirection(game: GameState): "left" | "right" | "up" | "down" {
    let dir: "left" | "right" | "up" | "down" = "right"; //default;
    if (game?.backTrace.length) {
      const s = game.backTrace[game.backTrace.length - 1];
      dir = s[0] !== s[2] ? (s[0] > s[2] ? "left" : "right") : s[1] > s[3] ? "up" : "down";
    }
    return dir;
  }
}
