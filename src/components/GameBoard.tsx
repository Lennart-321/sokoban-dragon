import { useState } from "react";
import { GameState } from "../classes/GameState";
import "../css/gameBoard.css";
import { Cell } from "./Cell";

interface IGameBoardProps {
  gameBoard: GameState;
}

export function GameBoard({ gameBoard }: IGameBoardProps): JSX.Element {
  const [drawnGameBoard, setDrawnGameBoard] = useState<GameState>(gameBoard);
  const jsxElement: JSX.Element[] = [];
  for (let i = 0; i < drawnGameBoard.board.length; i++) {
    for (let j = 0; j < drawnGameBoard.board[i].length; j++) {
      jsxElement.push(<Cell state={drawnGameBoard.board[i][j]} />);
    }
  }

  return (
    <>
      <div
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${drawnGameBoard.width}, 1fr)`,
          gridTemplateRows: `repeat(${drawnGameBoard.height}, 1fr)`,
        }}
      >
        {jsxElement}
      </div>
    </>
  );
}
