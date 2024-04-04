import { useState } from "react";
import "./App.css";
import { GameState } from "./classes/GameState";
import { GameBoard } from "./components/GameBoard";
import { Information } from "./components/Information";
import { Menu } from "./components/Menu";
import { Tutorial } from "./components/Tutorial";
import { Levels } from "./classes/Levels";
import Header from "./components/Header";
import { GameOver } from "./components/GameOver";
import WinScreen from "./components/WinScreen";

function App() {
  const [game, setGame] = useState<GameState | null>(null);
  const [levelNbr, setLevelNbr] = useState(0);
  const [moves, setMoves] = useState(0);
  const [pushes, setPushes] = useState(0);
  const [restart, setRestart] = useState<boolean>(false);
  const [running, setRunning] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showStartScreenTab, setStartScreenTab] = useState<boolean>(false);
  const [gameStopped, setGameStopped] = useState<boolean>(false);

  function setLevelIndex(index: number) {
    if (index !== -1) {
      setGame(Levels.getGameState(index));
      setLevelNbr(index + 1);
      setMoves(0);
      setPushes(0);
      if (index + 1 === levelNbr) {
        // Restart level
        setRestart(true);
      }
      setRunning(true);
    } else {
      setMoves(0);
      setPushes(0);
      setLevelNbr(-1);
      setRunning(false);
      setGameStopped(true);
    }
  }

  return (
    <>
      <Header />
      <Menu setGame={setGame} levelNbr={levelNbr} setLevel={setLevelIndex} setShowTutorial={setShowTutorial} setStartScreenTab={setStartScreenTab} />
      <Information
        levelNbr={levelNbr}
        moves={moves}
        pushes={pushes}
        restart={restart}
        running={running}
        setRestart={setRestart}
        gameStopped={gameStopped}
        setGameStopped={setGameStopped}
      />
      <Tutorial showTutorial={showTutorial} setShowTutorial={setShowTutorial} />
      <section className="playground">
        <GameBoard
          game={game}
          running={running}
          setMoves={setMoves}
          setPushes={setPushes}
          setRunning={setRunning}
          setLevel={setLevelIndex}
          numberOfLevels={Levels.levels.length}
          showStartScreenTab={showStartScreenTab}
          setStartScreenTab={setStartScreenTab}
        />
        <GameOver running={running} levelNbr={levelNbr} />
      </section>
    </>
  );
}

export default App;
