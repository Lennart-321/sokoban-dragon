import { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./classes/GameState";
import { GameBoard } from "./components/GameBoard";
import { GameEngine } from "./classes/GameEngine";
import { Menu } from "./components/Menu";

const dummyGameState = new GameState([[1]]);

function App() {
  const [level, setLevel] = useState<GameState>(dummyGameState);

  let gameEngine = new GameEngine(level);

  const handleKeyDown = (key: string) => {
    if (
      key === "ArrowDown" ||
      key === "ArrowRight" ||
      key === "ArrowLeft" ||
      key === "ArrowUp"
    ) {
      setLevel(gameEngine.movePlayer(key));
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
      <Menu setLevel={setLevel} />
      <GameBoard gameBoard={level} />
    </>
  );
}

export default App;
