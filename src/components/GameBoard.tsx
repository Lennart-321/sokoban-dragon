import { GameState } from "../classes/GameState";
import "../css/gameBoard.css";
import { Cell } from "./Cell";

interface IGameBoardProps {
  gameBoard: GameState;
  board: number[][];
}

export function GameBoard({ gameBoard, board }: IGameBoardProps): JSX.Element {
  const jsxElement: JSX.Element[] = [];
  console.log(board);
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      jsxElement.push(<Cell state={board[i][j]} />);
    }
  }

  return (
    <>
      <div
        className="game-board"
        style={{
          width: `${gameBoard.width * 64}px`,
          height: `${gameBoard.height * 64}px`,
          gridTemplateColumns: `repeat(${gameBoard.width}, 1fr)`,
          gridTemplateRows: `repeat(${gameBoard.height}, 1fr)`,
        }}
      >
        {jsxElement}
      </div>
    </>
  );
}
