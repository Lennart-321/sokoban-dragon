import { Dispatch, SetStateAction } from "react";
import { GameState } from "../classes/GameState";
import { Levels } from "../classes/Levels";
import "../css/menu.css";

export interface IMenuProps {
    setLevel: Dispatch<SetStateAction<GameState>>;
    setShowTutorial: Dispatch<SetStateAction<boolean>>;
}

export function Menu({ setLevel, setShowTutorial }: IMenuProps): JSX.Element {
    const gameButtons: JSX.Element[] = [];
    for (let i = 0; i < Levels.levels.length; i++) {
        gameButtons.push(
            <button key={i} className="menu-game-button" onClick={() => handleGameSelection(i)}>
                Spel {i + 1}
            </button>
        );
    }

    return (
        <nav id="the-menu">
            <p className="menu-info">Välkommen att spela SOKOBAN (version Dragon)</p>
            {gameButtons}
            <button
                className="menu-game-button"
                onClick={() => {
                    setShowTutorial(true);
                }}
            >
                Hjälp
            </button>
        </nav>
    );

    function handleGameSelection(index: number): void {
        setLevel(Levels.getGameState(index));
    }
}
