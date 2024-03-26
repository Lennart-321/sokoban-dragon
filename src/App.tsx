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
  const [levelNbr, setLevelNbr] = useState(0);
  const [moves, setMoves] = useState(0);
  const [pushes, setPushes] = useState(0);
  const [backSteps, setBackSteps] = useState(0);
  const [running, setRunning] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  function setLevelIndex(index: number) {
    setGame(Levels.getGameState(index));
    setLevelNbr(index + 1);
    setMoves(0);
    setPushes(0);
    setBackSteps(0);
    setRunning(true);
  }

  return (
    <>
      <Header />
      <Menu setLevel={setLevelIndex} numberOfLevels={Levels.levels.length} setShowTutorial={setShowTutorial} />
      <Information levelNbr={levelNbr} moves={moves} pushes={pushes} backSteps={backSteps} running={running} />
      <Tutorial showTutorial={showTutorial} setShowTutorial={setShowTutorial} />
      <section className="playground">
        <GameBoard
          game={game}
          running={running}
          setMoves={setMoves}
          setPushes={setPushes}
          setBackSteps={setBackSteps}
          setRunning={setRunning}
        />
        <GameOver running={running} levelNbr={levelNbr} />
      </section>
    </>
  );
}

export default App;
