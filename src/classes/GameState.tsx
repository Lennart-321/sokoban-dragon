export class GameState {
  width: number;
  height: number;
  playerX: number;
  playerY: number;
  boxJustMoved: boolean;
  board: number[][]; //0=empty, 1=player, 2=box, 4=target, 5=man+target, 6=box+target, 8=wall, 9=offside
  //16 trapped box, 32=immovabel box
  // trapStatus: number[][] = []; //0=no trap, 1+ = trap with n targets  32=wall trapp, 64=immovabel from
  //backTrace: (number | { x: number; y: number }[])[][];
  backTrace: [number, number, number, number, number, number, { x: number; y: number }[]][];
  constructor(board: number[][], playerX?: number, playerY?: number) {
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
    this.boxJustMoved = false;
    this.backTrace = [];
    // this.trapStatus = this.calcTrappSquares();
    //console.log("calcTrappSquares", "returned", this.isTrapSquare);
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
  // public getImmediateTrapStatus(c: number, r: number): number {
  //   const adjSt = this.getAdjacentStates(c, r);
  //   if (
  //     ((adjSt[0] & (8 + 32)) !== 0 || (adjSt[1] & (8 + 32)) !== 0) &&
  //     ((adjSt[2] & (8 + 32)) !== 0 || (adjSt[3] & (8 + 32)) !== 0)
  //   ) {
  //     return 64;
  //   }
  //   return 0;
  // }
  // private calcTrappSquares(): number[][] {
  //   //console.log("calcTrappSquares", "start");
  //   const mtrx = this.board.map(row => row.map(() => 0));
  //   //console.log("calcTrappSquares", "matrix created", mtrx);

  //   //Corners:
  //   for (let r = 0; r < this.height; r++) {
  //     for (let c = 0; c < this.width; c++) {
  //       const s = this.board[r][c];
  //       if (s === 8 || s === 9) continue;
  //       mtrx[r][c] = this.getImmediateTrapStatus(c, r);
  //     }
  //   }

  //   //console.log("calcTrappSquares", "coners done", mtrx);

  //   //Walls
  //   const dirStep = [
  //     [-1, 0],
  //     [1, 0],
  //     [0, -1],
  //     [0, 1],
  //   ];
  //   const trapWallIx = [
  //     [2, 3],
  //     [2, 3],
  //     [0, 1],
  //     [0, 1],
  //   ];
  //   for (let r = 0; r < this.height; r++) {
  //     for (let c = 0; c < this.width; c++) {
  //       if (!mtrx[r][c]) continue;
  //       for (let dir = 0; dir < 4; dir++) {
  //         const step = dirStep[dir];
  //         this.trapAhead(c + step[0], r + step[1], step, trapWallIx[dir], mtrx);
  //       }
  //     }
  //   }

  //   //console.log("calcTrappSquares", "walls done", mtrx);

  //   return mtrx;
  // }

  // private trapAhead(c: number, r: number, step: number[], trapWallIx: number[], isTrpSq: number[][]): boolean {
  //   if (isTrpSq[r][c]) {
  //     return true;
  //   }

  //   const state = this.board[r][c];
  //   if (state > 1) return false;

  //   const adjSt = this.getAdjacentStates(c, r);
  //   if (adjSt[trapWallIx[0]] !== 8 && adjSt[trapWallIx[1]] !== 8) return false;

  //   if (this.trapAhead(c + step[0], r + step[1], step, trapWallIx, isTrpSq)) {
  //     isTrpSq[r][c] = true;
  //     return true;
  //   }
  //   return false;
  // }

  public getAdjacentStates(c: number, r: number): number[] /*left,right,over,under*/ {
    const adjSt = Array(4);
    adjSt[0] = c > 0 ? this.board[r][c - 1] : 9;
    adjSt[1] = c < this.width - 1 ? this.board[r][c + 1] : 9;
    adjSt[2] = r > 0 ? this.board[r - 1][c] : 9;
    adjSt[3] = r < this.height - 1 ? this.board[r + 1][c] : 9;
    return adjSt;
  }

  public findPlayer() {
    this.findPlayerPosition();
  }
  public nrOfMoves() {
    return this.backTrace.length;
  }
}
