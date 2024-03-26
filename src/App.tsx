import { useState } from "react";
import "./App.css";
import { GameState } from "./classes/GameState";
import { GameBoard } from "./components/GameBoard";
import { Information } from "./components/Information";
import { Menu } from "./components/Menu";
import { Tutorial } from "./components/Tutorial";
import { Levels } from "./classes/Levels";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import { GameOver } from "./components/GameOver";

function App() {
  const [game, setGame] = useState<GameState | null>(null);
  const [gameProgressCount, setGameProgressCount] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  function setLevelIndex(index: number) {
    setGame(Levels.getGameState(index));
  }

  return (
    <>
      <Header />
      <Menu setLevel={setLevelIndex} numberOfLevels={Levels.levels.length} setShowTutorial={setShowTutorial} />
      <Information game={game} />
      <Tutorial showTutorial={showTutorial} setShowTutorial={setShowTutorial} />
      <section className="playground">
        <GameBoard game={game} setGameProgessCount={setGameProgressCount} />
        <GameOver running={game?.isRunning() ?? false} levelNbr={game?.level ?? 0} />
      </section>
    </>
  );
}

export default App;
