import { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./classes/GameState";
import { GameBoard } from "./components/GameBoard";
import { GameEngine } from "./classes/GameEngine";
import { Information } from "./components/Information";
import { Menu } from "./components/Menu";
import { Levels } from "./classes/Levels";

const dummyGameState = new GameState([[1]]);

function App() {
  const [game, setGame] = useState<GameState>(dummyGameState);
  const [levelNbr, setLevelNbr] = useState(0);
  const [moves, setMoves] = useState(0);
  const [pushes, setPushes] = useState(0);
  const [running, setRunning] = useState(false);

  function setLevelIndex(index: number) {
    setGame(Levels.getGameState(index));
    setLevelNbr(index + 1);
    setMoves(0);
    setPushes(0);
    setRunning(true);
  }

  let gameEngine = new GameEngine(game);

  const handleKeyDown = (key: string) => {
    if (
      key === "ArrowDown" ||
      key === "ArrowRight" ||
      key === "ArrowLeft" ||
      key === "ArrowUp"
    ) {
      setGame(gameEngine.movePlayer(key));
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
      <Menu setLevel={setLevelIndex} numberOfLevels={Levels.levels.length} />
      <Information
        levelNbr={levelNbr}
        moves={moves}
        pushes={pushes}
        running={running}
      />
      <GameBoard gameBoard={game} />
    </>
  );
}

export default App;
