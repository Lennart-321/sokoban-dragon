import { useState } from "react";
import "./App.css";
import { GameState } from "./classes/GameState";
import { GameBoard } from "./components/GameBoard";
import { Menu } from "./components/Menu";
import { Tutorial } from "./components/Tutorial";

const dummyGameState = new GameState([[1]]);

function App() {
    const [level, setLevel] = useState<GameState>(dummyGameState);
    const [showTutorial, setShowTutorial] = useState(false);

    return (
        <>
            <Menu setLevel={setLevel} setShowTutorial={setShowTutorial} />
            <Tutorial showTutorial={showTutorial} setShowTutorial={setShowTutorial} />
            <GameBoard gameBoard={level} />
        </>
    );
}

export default App;
