export class GameState {
  width: number;
  height: number;
  playerX: number;
  playerY: number;
  nrMoves: number;
  boxJustMoved: boolean;
  board: number[][]; //0=empty, 1=player, 2=box, 4=target, 5=man+target, 6=box+target, 8=wall
  constructor(board: number[][], boxJustMoved?: boolean, playerX?: number, playerY?: number) {
    this.board = board;
    this.width = board[0].length;
    this.height = board.length;
    if (!playerX || !playerY) {
      this.playerX = this.playerY = -1;
      this.findPlayerPosition();
    } else {
      this.playerX = playerX;
      this.playerY = playerY;
    }
    this.nrMoves = 0;
    this.boxJustMoved = boxJustMoved === undefined ? false : boxJustMoved;
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
}
