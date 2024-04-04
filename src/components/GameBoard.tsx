import { Dispatch, SetStateAction, useEffect, useState, useRef, MutableRefObject } from "react";
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
//<<<<<<< HEAD
  const boxStepAudio: any = useRef();
  const stepAudio: any = useRef();
  const boxPlaceAudio:any = useRef();
  const musicAudio:any = useRef();
  const undoAudio:any = useRef();
  const winAudio:any = useRef();
//=======
/*
  const stepAudio: any = useRef();
  const boxAudio: any = useRef();
  const targetAudio: any = useRef();
  const undoAudio: any = useRef();
  const successAudio: any = useRef();
  const backgroundAudio: any = useRef();
  */
  const backgroundAudioStatus: MutableRefObject<"PLAYING" | "NOT_STARTED" | "STOPPED"> = useRef("NOT_STARTED");
//>>>>>>> main

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

      switch (game.lastEvent) {
        case "PLAYER_MOVED":
          stepAudio.current.play();
          break;
        case "BOX_MOVED":
          boxStepAudio.current.play();
          break;
        case "BOX_MOVED_TO_TARGET":
          boxPlaceAudio.current.play();
          break;
        case "UNDO":
          undoAudio.current.play();
          break;
        case "GAME_SOLVED":
          winAudio.current.play();
          break;
      }
    }
  }, [game ? game.nrOfMoves() : 0]);

  useEffect(() => {
    if (running) {
      if (backgroundAudioStatus.current !== "PLAYING") {
        musicAudio.current.loop = true;
        musicAudio.current.volume = 0.3;
        //backgroundAudio.current.playbackRate = 0.3;

        musicAudio.current.play();
        backgroundAudioStatus.current = "PLAYING";
      }
    } else {
      if (backgroundAudioStatus.current === "PLAYING") {
        musicAudio.current.pause();
        backgroundAudioStatus.current = "STOPPED";
      }
    }
  });

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
        <audio ref={stepAudio} src={"./src/assets/step.mp3"}></audio>
        <audio ref={boxStepAudio} src={"./src/assets/box_step.mp3"}></audio>
        <audio ref={boxPlaceAudio} src={"./src/assets/box_place.mp3"}></audio>
        <audio ref={musicAudio} src={"./src/assets/sokoban.mp3"}></audio>
        <audio ref={undoAudio} src={"./rsc/assets/undo.wav"}></audio>
        <audio ref={winAudio} src={"./src/assets/win1.mp3"}></audio>

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
        <audio ref={stepAudio} src={"./src/assets/step.mp3"}></audio>
        <audio ref={boxStepAudio} src={"./src/assets/box_step.mp3"}></audio>
        <audio ref={boxPlaceAudio} src={"./src/assets/box_place.mp3"}></audio>
        <audio ref={musicAudio} src={"./src/assets/sokoban.mp3"}></audio>
        <audio ref={undoAudio} src={"./rsc/assets/undo.wav"}></audio>
        <audio ref={winAudio} src={"./src/assets/win1.mp3"}></audio>
        <StartScreen setLevel={setLevel} numberOfLevels={numberOfLevels} showStartScreenTab={showStartScreenTab} setStartScreenTab={setStartScreenTab} />
      </>
    );
  }
}
