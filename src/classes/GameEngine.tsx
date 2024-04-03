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
    game.boxJustMoved = false;

    switch (direction) {
      case "ArrowLeft":
        nextPlayerPos.x--;
        game.boxJustMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerLeft(playerY, playerX, currentBoard, setMoves, setPushes);
        break;
      case "ArrowRight":
        nextPlayerPos.x++;
        game.boxJustMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerRight(playerY, playerX, currentBoard, setMoves, setPushes);
        break;
      case "ArrowUp":
        nextPlayerPos.y--;
        game.boxJustMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerUp(playerY, playerX, currentBoard, setMoves, setPushes);
        break;
      case "ArrowDown":
        nextPlayerPos.y++;
        game.boxJustMoved = this.isBoxOnPos(currentBoard, nextPlayerPos);
        modifiedBoard = this.movePlayerDown(playerY, playerX, currentBoard, setMoves, setPushes);
        break;
      case "Backspace":
        if (game.backTrace.length === 0) return currentBoard;
        let preStateInfo: [number, number, number, number, number, number, { x: number; y: number }[]] =
          game.backTrace.pop()!;

        console.log(preStateInfo);
        currentBoard[preStateInfo[1]][preStateInfo[0]] += 1;
        currentBoard[preStateInfo[3]][preStateInfo[2]] -= 1;
        if (preStateInfo[4] >= 0) {
          //Resore box
          const boxGotStuck =
            preStateInfo[6].length > 0 &&
            (currentBoard[preStateInfo[5]][preStateInfo[4]] & 32) === 0 &&
            preStateInfo[6][0].x === preStateInfo[4] &&
            preStateInfo[6][0].y === preStateInfo[5];
          currentBoard[preStateInfo[3]][preStateInfo[2]] +=
            2 + (boxGotStuck ? 0 : currentBoard[preStateInfo[5]][preStateInfo[4]] & 16);
          currentBoard[preStateInfo[5]][preStateInfo[4]] -= 2;
          if (currentBoard[preStateInfo[5]][preStateInfo[4]] >= 16) {
            currentBoard[preStateInfo[5]][preStateInfo[4]] &= ~(16 + 32);
          }
          game.boxJustMoved = true;
          preStateInfo[6].forEach(pos => {
            currentBoard[pos.y][pos.x] &= ~((currentBoard[pos.y][pos.x] & 32) !== 0 ? 32 : 16);
          });
        }
        game.playerX = preStateInfo[0];
        game.playerY = preStateInfo[1];
        return currentBoard;
    }

    let [newPlayerY, newPlayerX] = this.findPlayer(modifiedBoard);
    if (newPlayerX !== playerX || newPlayerY !== playerY) {
      let newBoxPosition = { x: -1, y: -1 };
      let trappedBoxes: { x: number; y: number }[] = [];
      if (game.boxJustMoved) {
        newBoxPosition.x = playerX !== newPlayerX ? (playerX < newPlayerX ? newPlayerX + 1 : newPlayerX - 1) : playerX;
        newBoxPosition.y = playerY !== newPlayerY ? (playerY < newPlayerY ? newPlayerY + 1 : newPlayerY - 1) : playerY;
        this.boxTrapCalc(game, newBoxPosition, trappedBoxes);
      }
      game.backTrace.push([playerX, playerY, newPlayerX, newPlayerY, newBoxPosition.x, newBoxPosition.y, trappedBoxes]);

      game.playerX = newPlayerX;
      game.playerY = newPlayerY;

      this.gameOver(currentBoard, setRunning); // Check for game over
    }

    return currentBoard;
  }

  private static gameOver(board: number[][], setRunning: Dispatch<SetStateAction<boolean>>) {
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
    }
  }

  private static isBoxOnPos(board: number[][], pos: { x: number; y: number }) {
    return (
      0 <= pos.x && pos.x < board[0].length && 0 <= pos.y && pos.y < board.length && (board[pos.y][pos.x] & 2) != 0
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
      setMoves(val => val + 1);
      return currentBoard;
    } else if ((moveToIndex & (2 + 32)) === 2) {
      if (this.moveBox(currentBoard, playerY, playerX - 1, "left")) {
        currentBoard[playerY][playerX - 1] += 1;
        currentBoard[playerY][playerX] -= 1;
        setMoves(val => val + 1);
        setPushes(val => val + 1);
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
      setMoves(val => val + 1);
      return currentBoard;
    } else if ((moveToIndex & (2 + 32)) === 2) {
      if (this.moveBox(currentBoard, playerY, playerX + 1, "right")) {
        currentBoard[playerY][playerX + 1] += 1;
        currentBoard[playerY][playerX] -= 1;
        setMoves(val => val + 1);
        setPushes(val => val + 1);
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
      setMoves(val => val + 1);

      return currentBoard;
    } else if ((moveToIndex & (2 + 32)) === 2) {
      if (this.moveBox(currentBoard, playerY - 1, playerX, "up")) {
        currentBoard[playerY - 1][playerX] += 1;
        currentBoard[playerY][playerX] -= 1;
        setMoves(val => val + 1);
        setPushes(val => val + 1);
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
      setMoves(val => val + 1);

      return currentBoard;
    } else if ((moveToIndex & (2 + 32)) === 2) {
      if (this.moveBox(currentBoard, playerY + 1, playerX, "down")) {
        currentBoard[playerY + 1][playerX] += 1;
        currentBoard[playerY][playerX] -= 1;

        setMoves(val => val + 1);
        setPushes(val => val + 1);
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
      currentBoard[boxY + 1][boxX] += 2 + (currentBoard[boxY][boxX] & 16);
      currentBoard[boxY][boxX] &= ~(2 + 16);
      return true;
    }
    return false;
  }

  private static moveBoxUp(currentBoard: number[][], moveToIndex: number, boxY: number, boxX: number): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[boxY - 1][boxX] += 2 + (currentBoard[boxY][boxX] & 16);
      currentBoard[boxY][boxX] &= ~(2 + 16);
      return true;
    }
    return false;
  }

  private static moveBoxLeft(currentBoard: number[][], moveToIndex: number, boxY: number, boxX: number): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[boxY][boxX - 1] += 2 + (currentBoard[boxY][boxX] & 16);
      currentBoard[boxY][boxX] &= ~(2 + 16);
      return true;
    }
    return false;
  }

  private static moveBoxRight(currentBoard: number[][], moveToIndex: number, boxY: number, boxX: number): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[boxY][boxX + 1] += 2 + (currentBoard[boxY][boxX] & 16);
      currentBoard[boxY][boxX] &= ~(2 + 16);
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

  private static boxTrapCalc(
    game: GameState,
    newBoxPos: { x: number; y: number },
    turnedTrapped: { x: number; y: number }[]
  ): void {
    if (!this.boxImmovableCalc(game, newBoxPos, turnedTrapped)) {
      this.boxStuckCalc(game, newBoxPos, turnedTrapped);
    }
  }

  private static boxImmovableCalc(
    game: GameState,
    newBoxPos: { x: number; y: number },
    turnedImmovable: { x: number; y: number }[]
  ): boolean {
    if (this.isBoxImmovable(game, newBoxPos /*, turnedImmovable*/)) {
      game.board[newBoxPos.y][newBoxPos.x] |= 32;
      turnedImmovable.push(newBoxPos);

      const adjSt = game.getAdjacentStates(newBoxPos.x, newBoxPos.y);
      for (let i = 0; i < 4; i++) {
        //Box but not immovable
        if ((adjSt[i] & 2) === 2 && (adjSt[i] & 32) === 0) {
          const adjBoxPos = {
            x: newBoxPos.x + (i < 2 ? (i === 0 ? -1 : 1) : 0),
            y: newBoxPos.y + (i >= 2 ? (i === 2 ? -1 : 1) : 0),
          };
          this.boxImmovableCalc(game, adjBoxPos, turnedImmovable);
        }
      }
      return true;
    }
    return false;
  }

  private static isBoxImmovable(game: GameState, pos: { x: number; y: number }): boolean {
    if ((game.board[pos.y][pos.x] & 32) !== 0) {
      return true;
    }
    const adjSt = game.getAdjacentStates(pos.x, pos.y);
    const nrStops = adjSt.reduce((n, s) => n + ((s & (2 + 8)) !== 0 ? 1 : 0), 0);
    if (nrStops <= 1) {
      return false;
    }
    if (
      ((adjSt[0] & (8 + 32)) !== 0 || (adjSt[1] & (8 + 32)) !== 0) &&
      ((adjSt[2] & (8 + 32)) !== 0 || (adjSt[3] & (8 + 32)) !== 0)
    ) {
      return true;
    }
    if (nrStops === 2 && ((adjSt[0] & (2 + 8)) !== 0) === ((adjSt[1] & (2 + 8)) !== 0)) {
      return false;
    }
    const stopDir = [false, false, false, false];
    game.board[pos.y][pos.x] |= 32; //Temporary mark this as immovable
    for (let i = 0; i < 4; i++) {
      if ((adjSt[i] & (2 + 8)) === 0) continue;
      if ((adjSt[i] & (8 + 32)) !== 0) {
        stopDir[i] = true;
      } else if ((adjSt[i] & (2 + 32)) === 2) {
        stopDir[i] = this.isBoxImmovable(game, {
          x: pos.x + (i < 2 ? (i === 0 ? -1 : 1) : 0),
          y: pos.y + (i >= 2 ? (i === 2 ? -1 : 1) : 0),
        });
      }
    }
    game.board[pos.y][pos.x] &= ~32; //Restore

    const isImmovable = (stopDir[0] || stopDir[1]) && (stopDir[2] || stopDir[3]);
    return isImmovable;
  }

  private static boxStuckCalc(
    game: GameState,
    pos: { x: number; y: number },
    turnedStuck: { x: number; y: number }[]
  ): void {
    const steps = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (let i = 0; i < 4; i += 2) {
      const result = {
        wallAlreadyStuck: false,
        boxes: 0,
        targets: 0,
        stuckBoxPositions: [] as { x: number; y: number }[],
      };
      if (
        this.isStuckOnWall(game, pos, steps[i], result) &&
        this.isStuckOnWall(game, { x: pos.x + steps[i + 1][0], y: pos.y + steps[i + 1][1] }, steps[i + 1], result)
      ) {
        if (result.wallAlreadyStuck) {
          if ((game.board[pos.y][pos.x] & 16) === 0) {
            game.board[pos.y][pos.x] |= 16;
            turnedStuck.push(pos);
          }
        } else if (result.boxes > result.targets) {
          result.stuckBoxPositions.forEach(pos => (game.board[pos.y][pos.x] |= 16));
          turnedStuck.push(pos, ...result.stuckBoxPositions);
        }
      }
    }
  }

  private static isStuckOnWall(
    game: GameState,
    pos: { x: number; y: number },
    step: number[],
    result: { wallAlreadyStuck: boolean; boxes: number; targets: number; stuckBoxPositions: { x: number; y: number }[] }
  ): boolean {
    const state = game.board[pos.y][pos.x];
    if ((state & 16) !== 0) {
      result.wallAlreadyStuck = true;
      return true;
    }
    if ((state & (8 + 32)) !== 0) {
      return true;
    }

    const adjSt = game.getAdjacentStates(pos.x, pos.y);
    if (
      (step[0] !== 0 && (adjSt[2] & (8 + 32)) === 0 && (adjSt[3] & (8 + 32)) === 0) ||
      (step[1] !== 0 && (adjSt[0] & (8 + 32)) === 0 && (adjSt[1] & (8 + 32)) === 0)
    ) {
      return false;
    }

    if (this.isStuckOnWall(game, { x: pos.x + step[0], y: pos.y + step[1] }, step, result)) {
      if ((state & 2) === 2) {
        result.boxes++;
        if ((state & 16) === 0) {
          //Not already stuck
          result.stuckBoxPositions.push(pos);
        }
      }
      result.targets += (state & 4) === 4 ? 1 : 0;
      return true;
    }
    return false;
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
