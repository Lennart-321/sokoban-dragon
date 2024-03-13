import { GameState } from "./GameState";

export class GameEngine {
  gameState: GameState;
  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  public movePlayer(direction: string): GameState {
    let playerX = this.gameState.playerX;
    let playerY = this.gameState.playerY;
    console.log("move player invoked");

    if (direction === "ArrowUp") {
      if (this.gameState.board[playerY - 1][playerX] === 0) {
        this.gameState.board[playerY][playerX] = 0;
        this.gameState.board[playerY - 1][playerX] = 1;

        console.log("Successful move", this.gameState.board);
        return new GameState(this.gameState.board);
      }
    } else if (direction === "ArrowDown") {
      if (this.gameState.board[playerY + 1][playerX] === 0) {
        this.gameState.board[playerY][playerX] = 0;
        this.gameState.board[playerY + 1][playerX] = 1;

        console.log("Successful move", this.gameState.board);
        return new GameState(this.gameState.board);
      }
    } else if (direction === "ArrowRight") {
      if (this.gameState.board[playerY][playerX + 1] === 0) {
        this.gameState.board[playerY][playerX] = 0;
        this.gameState.board[playerY][playerX + 1] = 1;

        console.log("Successful move", this.gameState.board);
        return new GameState(this.gameState.board);
      }
    } else if (direction === "ArrowLeft") {
      if (this.gameState.board[playerY][playerX] === 0) {
        this.gameState.board[playerY][playerX] = 0;
        this.gameState.board[playerY][playerX - 1] = 1;

        console.log("Successful move", this.gameState.board);
        return new GameState(this.gameState.board);
      }
    }
    return this.gameState;
  }

  public getCurrentBoard(): GameState {
    return this.gameState;
  }
}
