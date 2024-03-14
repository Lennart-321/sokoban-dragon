import { useState } from "react";
import "./App.css";
import { GameState } from "./classes/GameState";
import { GameBoard } from "./components/GameBoard";
import { Menu } from "./components/Menu";
import { Levels } from "./classes/Levels";

const dummyGameState = new GameState([[1]]);

function App() {
    const [game, setGame] = useState<GameState>(dummyGameState);

    function setLevelIndex(index: number) {
        setGame(Levels.getGameState(index));
    }

    return (
        <>
            <Menu setLevel={setLevelIndex} numberOfLevels={Levels.levels.length} />
            <GameBoard gameBoard={game} />
        </>
    );
}

export default App;
