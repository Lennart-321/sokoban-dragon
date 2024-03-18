import { GameState } from "./GameState";

export class GameEngine {
  gameState: GameState;
  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  public movePlayer(direction: string) {
    const root = document.documentElement;
    let playerX = this.gameState.playerX;
    let playerY = this.gameState.playerY;
    let currentBoard = this.gameState.board;

    switch (direction) {
      case "ArrowLeft":
        root.style.setProperty('--playerImg', 'url("src/img/spr_player_left.png")');
        return this.movePlayerLeft(playerY, playerX, currentBoard);
      case "ArrowRight":
        root.style.setProperty('--playerImg', 'url("src/img/spr_player_right.png")');
        return this.movePlayerRight(playerY, playerX, currentBoard);
      case "ArrowUp":
        root.style.setProperty('--playerImg', 'url("src/img/spr_player_up.png")');
        return this.movePlayerUp(playerY, playerX, currentBoard);
      case "ArrowDown":
        root.style.setProperty('--playerImg', 'url("src/img/spr_player_down.png")');
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
    } else if (moveToIndex === 2 || moveToIndex === 6) {
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
    }
    return this.gameState;
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
      return this.moveBoxRight(moveToIndex, boxY, boxX);
    } else if (direction === "down") {
      let moveToIndex = this.gameState.board[boxY + 1][boxX];
      return this.moveBoxDown(moveToIndex, boxY, boxX);
    } else if (direction === "up") {
      let moveToIndex = this.gameState.board[boxY - 1][boxX];
      return this.moveBoxUp(moveToIndex, boxY, boxX);
    } else if (direction === "left") {
      let moveToIndex = this.gameState.board[boxY][boxX - 1];
      return this.moveBoxLeft(moveToIndex, boxY, boxX);
    }
  }

  private moveBoxDown(
    moveToIndex: number,
    boxY: number,
    boxX: number
  ): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      this.gameState.board[boxY][boxX] -= 2;
      this.gameState.board[boxY + 1][boxX] += 2;
      return true;
    }
    return false;
  }

  private moveBoxUp(moveToIndex: number, boxY: number, boxX: number): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      this.gameState.board[boxY][boxX] -= 2;
      this.gameState.board[boxY - 1][boxX] += 2;
      return true;
    }
    return false;
  }

  private moveBoxLeft(
    moveToIndex: number,
    boxY: number,
    boxX: number
  ): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      this.gameState.board[boxY][boxX] -= 2;
      this.gameState.board[boxY][boxX - 1] += 2;
      return true;
    }
    return false;
  }

  private moveBoxRight(
    moveToIndex: number,
    boxY: number,
    boxX: number
  ): boolean {
    if (moveToIndex === 0 || moveToIndex === 4) {
      this.gameState.board[boxY][boxX] -= 2;
      this.gameState.board[boxY][boxX + 1] += 2;
      return true;
    }
    return false;
  }

  public getCurrentBoard(): GameState {
    return this.gameState;
  }
}
