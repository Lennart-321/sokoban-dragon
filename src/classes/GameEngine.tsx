import { Dispatch, SetStateAction } from "react";
import { GameState } from "./GameState";

export class GameEngine {
  public static movePlayer(
    direction: string,
    game: GameState,
    setMoves: Dispatch<SetStateAction<number>>,
    setPushes: Dispatch<SetStateAction<number>>,
    setRunning: Dispatch<SetStateAction<boolean>>
  ) {
    let playerX = game.playerX;
    let playerY = game.playerY;
    let currentBoard = game.board;
    const nextPlayerPos = { x: playerX, y: playerY };
    let modifiedBoard: number[][] = [[]];
    let boxJustMoved = false;

    switch (direction) {
      case "ArrowLeft":
        nextPlayerPos.x--;
        boxJustMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerLeft(playerY, playerX, currentBoard, setMoves, setPushes);
        break;
      case "ArrowRight":
        nextPlayerPos.x++;
        boxJustMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerRight(playerY, playerX, currentBoard, setMoves, setPushes);
        break;
      case "ArrowUp":
        nextPlayerPos.y--;
        boxJustMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerUp(playerY, playerX, currentBoard, setMoves, setPushes);
        break;
      case "ArrowDown":
        nextPlayerPos.y++;
        boxJustMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerDown(playerY, playerX, currentBoard, setMoves, setPushes);
        break;
      case "Backspace":
        if (game.backTrace.length === 0) return currentBoard;
        let preStateInfo: number[] = game.backTrace.pop()!;
        currentBoard[preStateInfo[1]][preStateInfo[0]] += 1;
        currentBoard[preStateInfo[3]][preStateInfo[2]] -= 1;
        if (preStateInfo[4] >= 0) {
          //Resore box
          currentBoard[preStateInfo[3]][preStateInfo[2]] += 2;
          currentBoard[preStateInfo[5]][preStateInfo[4]] -= 2;
          //game.boxJustMoved = true;
        }
        game.playerX = preStateInfo[0];
        game.playerY = preStateInfo[1];
        game.lastEvent = "UNDO";
        return currentBoard;
    }

    let [newPlayerY, newPlayerX] = this.findPlayer(modifiedBoard);
    if (newPlayerX !== playerX || newPlayerY !== playerY) {
      let newBoxPosition = { x: -1, y: -1 };
      if (boxJustMoved) {
        newBoxPosition.x = playerX !== newPlayerX ? (playerX < newPlayerX ? newPlayerX + 1 : newPlayerX - 1) : playerX;
        newBoxPosition.y = playerY !== newPlayerY ? (playerY < newPlayerY ? newPlayerY + 1 : newPlayerY - 1) : playerY;
        game.lastEvent =
          (game.board[newBoxPosition.y][newBoxPosition.x] & 4) === 4 ? "BOX_MOVED_TO_TARGET" : "BOX_MOVED";
      } else {
        game.lastEvent = "PLAYER_MOVED";
      }
      game.backTrace.push([playerX, playerY, newPlayerX, newPlayerY, newBoxPosition.x, newBoxPosition.y]);

      game.playerX = newPlayerX;
      game.playerY = newPlayerY;

      if (this.gameOver(currentBoard, setRunning, game.levelNbr)) {
        // Check for game over
        game.lastEvent = "GAME_SOLVED";
      }
    }

    return currentBoard;
  }

  private static gameOver(board: number[][], setRunning: Dispatch<SetStateAction<boolean>>, levelNbr: number) {
    let emptyTarget = false;

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] === 4 || board[y][x] === 5) {
          // 4=target, 5=man+target
          emptyTarget = true;
          break;
        }
      }
    }

    if (!emptyTarget) {
      // No empty target => game over
      setRunning(false);
      localStorage.setItem("highestLevel", (levelNbr + 1).toString());
    }
    return !emptyTarget;
  }

  private static isBoxOnPos(board: number[][], pos: { x: number; y: number }) {
    return 0 <= pos.x && pos.x < board[0].length && 0 <= pos.y && pos.y < board.length && (board[pos.y][pos.x] & 2) != 0;
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

  public static lastDirection(game: GameState): "left" | "right" | "up" | "down" {
    let dir: "left" | "right" | "up" | "down" = "right"; //default;
    if (game?.backTrace.length) {
      const s = game.backTrace[game.backTrace.length - 1];
      dir = s[0] !== s[2] ? (s[0] > s[2] ? "left" : "right") : s[1] > s[3] ? "up" : "down";
    }
    return dir;
  }
}
