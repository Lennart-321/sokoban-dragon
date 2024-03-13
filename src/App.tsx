import { useState } from "react";
import "./App.css";
import { GameState } from "./classes/GameState";
import { GameBoard } from "./components/GameBoard";
import { Menu } from "./components/Menu";

const dummyGameState = new GameState([[1]]);

function App() {
    const [level, setLevel] = useState<GameState>(dummyGameState);

    return (
        <>
            <Menu setLevel={setLevel} />
            <GameBoard gameBoard={level} />
        </>
    );
}

export default App;
