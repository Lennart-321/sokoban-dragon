import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import { GameState } from "../classes/GameState";
import "../css/gameBoard.css";
import { Cell } from "./Cell";
import { GameEngine } from "../classes/GameEngine";

interface IGameBoardProps {
  game: GameState;
  setMoves: Dispatch<SetStateAction<number>>;
  setPushes: Dispatch<SetStateAction<number>>;
}

let currentGame: GameState | undefined;

export function GameBoard({ game, setMoves, setPushes }: IGameBoardProps): JSX.Element {
  let stepAudio: any = useRef();
  let boxAudio: any = useRef();
  currentGame = game;

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const handleKeyDown = (key: string) => {
      if (key === "ArrowDown" || key === "ArrowRight" || key === "ArrowLeft" || key === "ArrowUp") {
        if (GameEngine.movePlayer(key, currentGame!, setMoves, setPushes)) {
          setRefresh(c => c + 1);
        }
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      handleKeyDown(e.key);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (game.boxJustMoved) boxAudio.current.play();
    else stepAudio.current.play();
  }, [game.nrMoves]);

  const jsxElement: JSX.Element[] = [];
  for (let i = 0; i < game.board.length; i++) {
    for (let j = 0; j < game.board[i].length; j++) {
      jsxElement.push(<Cell key={i * game.width + j} state={game.board[i][j]} step={game.lastStep} />);
    }
  }

  const playerImage =
    game.lastStep[0] !== 0 ? (game.lastStep[0] > 0 ? "right" : "left") : game.lastStep[1] > 0 ? "down" : "up";
  document.documentElement.style.setProperty("--playerImg", `url("src/img/spr_player_${playerImage}.png")`);

  return (
    <>
      <audio ref={stepAudio} src={"./src/assets/step.wav"}></audio>
      <audio ref={boxAudio} src={"./src/assets/pushbox.wav"}></audio>
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
