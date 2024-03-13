import { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./classes/GameState";
import { Levels } from "./classes/Levels";
import { GameBoard } from "./components/GameBoard";
import { Information } from "./components/Information";

function App() {
  const [levelNbr, setLevelNbr] = useState(0);
  const [moves, setMoves] = useState(0);
  const [pushes, setPushes] = useState(0);

  let level = Levels.getGameState(0);
 
  const updateLevel = (levelNbr: number) => {
    setLevelNbr(levelNbr);
    setMoves(0);
    setPushes(0);
  }

  useEffect(() => {
    updateLevel(0);  // Init starting game level
  }, []);

  return (
    <>
      <Information levelNbr={levelNbr} moves={moves} pushes={pushes}/>
      <GameBoard gameBoard={level} />
    </>
  );
}

export default App;
