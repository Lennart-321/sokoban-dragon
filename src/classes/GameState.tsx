export class GameState {
  width: number;
  height: number;
  playerX: number;
  playerY: number;
  lastEvent: "NONE" | "PLAYER_MOVED" | "BOX_MOVED" | "BOX_MOVED_TO_TARGET" | "UNDO" | "GAME_SOLVED";
  board: number[][]; //0=empty, 1=player, 2=box, 4=target, 5=man+target, 6=box+target, 8=wall, 9=offside
  backTrace: number[][];
  levelNbr: number;
  constructor(
    board: number[][],
    levelNbr: number,
    playerX?: number,
    playerY?: number
  ) {
    this.board = board;
    this.width = board[0].length;
    this.height = board.length;
    this.levelNbr = levelNbr;
    if (!playerX || !playerY) {
      this.playerX = this.playerY = -1;
      this.findPlayerPosition();
    } else {
      this.playerX = playerX;
      this.playerY = playerY;
    }
    this.lastEvent = "NONE";
    this.backTrace = [];
  }

  private findPlayerPosition() {
    this.board.find((row, rowIx) =>
      row.find((cell, colIx) => {
        if (cell === 1 || cell === 5) {
          //1=player 5=player+target
          this.playerX = colIx;
          this.playerY = rowIx;
          return true;
        }
        return false;
      })
    );
  }

  public findPlayer() {
    this.findPlayerPosition();
  }
  public nrOfMoves() {
    return this.backTrace.length;
  }
}
