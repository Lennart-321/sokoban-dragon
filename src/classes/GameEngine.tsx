import { GameState } from "./GameState";

export class GameEngine {
  gameState: GameState;
  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  public movePlayer(direction: string) {
    let playerX = this.gameState.playerX;
    let playerY = this.gameState.playerY;
    let currentBoard = this.gameState.board;

    switch (direction) {
      case "ArrowLeft":
        return this.movePlayerLeft(playerY, playerX, currentBoard);
      case "ArrowRight":
        return this.movePlayerRight(playerY, playerX, currentBoard);
      case "ArrowUp":
        return this.movePlayerUp(playerY, playerX, currentBoard);
      case "ArrowDown":
        return this.movePlayerDown(playerY, playerX, currentBoard);
      default:
        return this.gameState;
    }
  }

  private movePlayerLeft(
    playerY: number,
    playerX: number,
    currentBoard: number[][]
  ) {
    let moveToIndex = currentBoard[playerY][playerX - 1];

    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[playerY][playerX - 1] += 1;
      currentBoard[playerY][playerX] -= 1;
      return new GameState(currentBoard);
    } else if (moveToIndex === 2 || moveToIndex === 4) {
      if (this.moveBox(playerY, playerX - 1, "left")) {
        currentBoard[playerY][playerX - 1] += 1;
        currentBoard[playerY][playerX] -= 1;
        return new GameState(currentBoard);
      }
    }

    return this.gameState;
  }

  private movePlayerRight(
    playerY: number,
    playerX: number,
    currentBoard: number[][]
  ) {
    let moveToIndex = currentBoard[playerY][playerX + 1];

    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[playerY][playerX + 1] += 1;
      currentBoard[playerY][playerX] -= 1;
      return new GameState(currentBoard);
    } else if (moveToIndex === 2 || moveToIndex === 6) {
      if (this.moveBox(playerY, playerX + 1, "right")) {
        currentBoard[playerY][playerX + 1] += 1;
        currentBoard[playerY][playerX] -= 1;
        return new GameState(currentBoard);
      }
    }

    return this.gameState;
  }

  private movePlayerUp(
    playerY: number,
    playerX: number,
    currentBoard: number[][]
  ) {
    let moveToIndex = currentBoard[playerY - 1][playerX];

    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[playerY - 1][playerX] += 1;
      currentBoard[playerY][playerX] -= 1;
      return new GameState(currentBoard);
    } else if (moveToIndex === 2 || moveToIndex === 6) {
      if (this.moveBox(playerY - 1, playerX, "up")) {
        currentBoard[playerY - 1][playerX] += 1;
        currentBoard[playerY][playerX] -= 1;
        return new GameState(currentBoard);
      }

      return this.gameState;
    }
  }

  private movePlayerDown(
    playerY: number,
    playerX: number,
    currentBoard: number[][]
  ) {
    let moveToIndex = currentBoard[playerY + 1][playerX];

    if (moveToIndex === 0 || moveToIndex === 4) {
      currentBoard[playerY + 1][playerX] += 1;
      currentBoard[playerY][playerX] -= 1;
      return new GameState(currentBoard);
    } else if (moveToIndex === 2 || moveToIndex === 6) {
      if (this.moveBox(playerY + 1, playerX, "down")) {
        currentBoard[playerY + 1][playerX] += 1;
        currentBoard[playerY][playerX] -= 1;
        return new GameState(currentBoard);
      }
    }

    return this.gameState;
  }

  private moveBox(boxY: number, boxX: number, direction: string) {
    if (direction === "right") {
      let moveToIndex = this.gameState.board[boxY][boxX + 1];
      if (moveToIndex === 0 || moveToIndex === 4) {
        this.gameState.board[boxY][boxX] -= 2;
        this.gameState.board[boxY][boxX + 1] += 2;
        return true;
      }
      return false;
    } else if (direction === "down") {
      let moveToIndex = this.gameState.board[boxY + 1][boxX];
      if (moveToIndex === 0 || moveToIndex === 4) {
        this.gameState.board[boxY][boxX] -= 2;
        this.gameState.board[boxY + 1][boxX] += 2;
        return true;
      }
    } else if (direction === "up") {
      let moveToIndex = this.gameState.board[boxY - 1][boxX];
      if (moveToIndex === 0 || moveToIndex === 4) {
        this.gameState.board[boxY][boxX] -= 2;
        this.gameState.board[boxY - 1][boxX] += 2;
        return true;
      }
    } else if (direction === "left") {
      let moveToIndex = this.gameState.board[boxY][boxX - 1];
      if (moveToIndex === 0 || moveToIndex === 4) {
        this.gameState.board[boxY][boxX] -= 2;
        this.gameState.board[boxY][boxX - 1] += 2;
        return true;
      } else {
        return false;
      }
    }
  }

  public getCurrentBoard(): GameState {
    return this.gameState;
  }
}
