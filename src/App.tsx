import { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./classes/GameState";
import { GameBoard } from "./components/GameBoard";
import { GameEngine } from "./classes/GameEngine";
import { Information } from "./components/Information";
import { Menu } from "./components/Menu";
import { Tutorial } from "./components/Tutorial";
import { Levels } from "./classes/Levels";

const dummyGameState = new GameState([[1]]);

function App() {
  const [game, setGame] = useState<GameState>(dummyGameState);
  const [map, setMap] = useState<number[][]>(dummyGameState.board);
  const [levelNbr, setLevelNbr] = useState(0);
  const [moves, setMoves] = useState(0);
  const [pushes, setPushes] = useState(0);
  const [running, setRunning] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  function setLevelIndex(index: number) {
    setGame(Levels.getGameState(index));
    setMap(game.board);
    setLevelNbr(index + 1);
    setMoves(0);
    setPushes(0);
    setRunning(true);
  }

  const handleKeyDown = (key: string) => {
    if (
      key === "ArrowDown" ||
      key === "ArrowRight" ||
      key === "ArrowLeft" ||
      key === "ArrowUp"
    ) {
      console.log(game.playerX, game.playerY);
      game.board = GameEngine.movePlayer(key, game, setMoves, setPushes);
      game.findPlayer();
      setMap(game.board);
      setRefreshCount((c) => c + 1);
      console.log(game.playerX, game.playerY);
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

  return (
    <>
      <Menu
        setLevel={setLevelIndex}
        numberOfLevels={Levels.levels.length}
        setShowTutorial={setShowTutorial}
      />
      <Information
        levelNbr={levelNbr}
        moves={moves}
        pushes={pushes}
        running={running}
      />
      <Tutorial showTutorial={showTutorial} setShowTutorial={setShowTutorial} />
      <GameBoard gameBoard={game} board={map} />
    </>
  );
}

export default App;
