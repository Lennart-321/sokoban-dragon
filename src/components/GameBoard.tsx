import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import { GameState } from "../classes/GameState";
import "../css/gameBoard.css";
import { Cell } from "./Cell";
import { GameEngine } from "../classes/GameEngine";
import StartScreen from "./StartScreen";

interface IGameBoardProps {
  game: GameState | null;
  running: boolean;
  setMoves: Dispatch<SetStateAction<number>>;
  setPushes: Dispatch<SetStateAction<number>>;
  setRunning: Dispatch<SetStateAction<boolean>>;
  setLevel: (index: number) => void;
  numberOfLevels: number;
  showStartScreenTab: boolean;
  setStartScreenTab: Dispatch<SetStateAction<boolean>>;
}

export function GameBoard({
  game,
  running,
  setMoves,
  setPushes,
  setRunning,
  setLevel,
  numberOfLevels,
  showStartScreenTab,
  setStartScreenTab,
}: IGameBoardProps): JSX.Element {
  const [refresh, setRefresh] = useState(0);
  const boxAudio: any = useRef();
  const stepAudio: any = useRef();

  const handleKeyDown = (key: string) => {
    if (running && (key === "ArrowDown" || key === "ArrowRight" || key === "ArrowLeft" || key === "ArrowUp" || key === "Backspace")) {
      if (game) {
        game.board = GameEngine.movePlayer(key, game, setMoves, setPushes, setRunning);
        game.findPlayer();
        setRefresh((c) => c + 1);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      handleKeyDown(e.key);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  useEffect(() => {
    if (game?.nrOfMoves()) {
      if (game.boxJustMoved) boxAudio.current.play();
      else stepAudio.current.play();
    }
  }, [game ? game.nrOfMoves() : 0]);

  if (game !== null) {
    document.documentElement.style.setProperty("--playerImg", `url("src/img/spr_player_${GameEngine.lastDirection(game)}.png")`);

    const jsxElement: JSX.Element[] = [];
    for (let i = 0; i < game.board.length; i++) {
      for (let j = 0; j < game.board[i].length; j++) {
        jsxElement.push(<Cell key={i * game.width + j} state={game.board[i][j]} />);
      }
    }

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
  } else {
    return (
      <>
        <StartScreen setLevel={setLevel} numberOfLevels={numberOfLevels} showStartScreenTab={showStartScreenTab} setStartScreenTab={setStartScreenTab} />
      </>
    );
  }
}
