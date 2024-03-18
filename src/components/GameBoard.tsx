import { useEffect, useRef } from "react";
import { GameState } from "../classes/GameState";
import "../css/gameBoard.css";
import { Cell } from "./Cell";

interface IGameBoardProps {
  gameBoard: GameState;
}

export function GameBoard({ gameBoard }: IGameBoardProps): JSX.Element {
  let nrOfMoves = useRef(gameBoard.nrMoves);
  let stepAudio: any = useRef();
  let boxAudio: any = useRef();

  if (nrOfMoves.current !== gameBoard.nrMoves) {
    nrOfMoves.current = gameBoard.nrMoves;
    if (gameBoard.boxJustMoved) boxAudio.current.play();
    else stepAudio.current.play();
  }
  // nrOfMoves.current = gameBoard.nrMoves;
  // useEffect(() => {
  //   if (gameBoard.boxJustMoved) boxAudio.current.play();
  //   else stepAudio.current.play();
  // }, [nrOfMoves.current]);

  const jsxElement: JSX.Element[] = [];
  for (let i = 0; i < gameBoard.board.length; i++) {
    for (let j = 0; j < gameBoard.board[i].length; j++) {
      jsxElement.push(<Cell key={i * gameBoard.width + j} state={gameBoard.board[i][j]} />);
    }
  }

  return (
    <>
      <audio ref={stepAudio} src={"./src/assets/step.wav"}></audio>
      <audio ref={boxAudio} src={"./src/assets/pushbox.wav"}></audio>
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
