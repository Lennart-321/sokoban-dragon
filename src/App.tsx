import "./App.css";
import { GameState } from "./classes/GameState";
import { Levels } from "./classes/Levels";
import { GameBoard } from "./components/GameBoard";

function App() {
  let level = Levels.getGameState(0);
  return (
    <>
      <GameBoard gameBoard={level} />
    </>
  );
}

export default App;
