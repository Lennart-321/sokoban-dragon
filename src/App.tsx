import { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./classes/GameState";
import { Levels } from "./classes/Levels";
import { GameBoard } from "./components/GameBoard";
import { GameEngine } from "./classes/GameEngine";

function App() {
  const [level, setLevel] = useState<GameState>(Levels.getGameState(0));
  let gameEngine = new GameEngine(level);

  const handleKeyDown = (key: string) => {
    console.log("key down", key);
    setLevel(gameEngine.movePlayer(key));
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
      <GameBoard gameBoard={level} />
    </>
  );
}

export default App;
