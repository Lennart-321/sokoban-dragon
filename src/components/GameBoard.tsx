import { GameState } from "../classes/GameState";
import "../css/gameBoard.css";
import { Cell } from "./Cell";

interface IGameBoardProps {
  board: number[][];
  game: GameState;
}

export function GameBoard({ board, game }: IGameBoardProps): JSX.Element {
  const jsxElement: JSX.Element[] = [];
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
          width: `${game.width * 64}px`,
          height: `${game.height * 64}px`,
          gridTemplateColumns: `repeat(${game.width}, 1fr)`,
          gridTemplateRows: `repeat(${game.height}, 1fr)`,
        }}
      >
        {jsxElement}
      </div>
    </>
  );
}
