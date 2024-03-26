export class GameState {
  width: number;
  height: number;
  playerX: number;
  playerY: number;
  boxJustMoved: boolean;
  board: number[][]; //0=empty, 1=player, 2=box, 4=target, 5=man+target, 6=box+target, 8=wall
  backTrace: number[][];
  level: number;
  //nrBoxes: number;
  moves: number;
  pushes: number;
  backSteps: number;
  startTime: Date;
  stopTime: Date;
  constructor(board: number[][], level: number) {
    this.board = board;
    this.width = board[0].length;
    this.height = board.length;
    this.playerX = this.playerY = -1;
    this.findPlayerPosition();

    this.level = level;
    this.boxJustMoved = false;
    this.backTrace = [];
    this.moves = 0;
    this.pushes = 0;
    this.backSteps = 0;
    this.stopTime = this.startTime = new Date();
    //this.nrBoxes = this.getNrBoxes();
  }

  public score(now?: Date | null) {
    const time = this.isRunning() ? (now ? now : new Date()) : this.stopTime;
    const elapsedMs = time.getTime() - this.startTime.getTime();
    return (
      1000 * this.getNrBoxesOnTarget() -
      5 * this.pushes -
      this.moves -
      Math.floor(elapsedMs / 1000) -
      30 * this.backSteps
    );
  }
  public isRunning() {
    return this.stopTime === this.startTime;
  }
  public stopRunning() {
    this.stopTime = new Date();
  }
  // public findPlayer() {
  //   this.findPlayerPosition();
  // }
  public incMoves() {
    this.moves++;
  }
  public incPushes() {
    this.pushes++;
  }
  public nrOfMoves() {
    return this.backTrace.length;
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
  private getNrBoxesOnTarget() {
    return this.board.reduce(
      (nrBox, row) => nrBox + row.reduce((nrRowBox, state) => nrRowBox + (state === 6 ? 1 : 0), 0),
      0
    );
  }
}
