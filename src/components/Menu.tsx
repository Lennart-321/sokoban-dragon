import { Dispatch, SetStateAction } from "react";
import { GameState } from "../classes/GameState";
import { Levels } from "../classes/Levels";
import "../css/menu.css";

export interface IMenuProps {
    setLevel: Dispatch<SetStateAction<GameState>>;
}

export function Menu({ setLevel }: IMenuProps): JSX.Element {
    const gameButtons: JSX.Element[] = [];
    for (let i = 0; i < Levels.levels.length; i++) {
        gameButtons.push(
            <button className="menu-game-button" onClick={() => handleGameSelection(i)}>
                Spel {i + 1}
            </button>
        );
    }

    return (
        <nav id="the-menu">
            <p className="menu-info">Välkommen att spela SOKOBAN (Dragon version)</p>
            {gameButtons}
        </nav>
    );

    function handleGameSelection(index: number): void {
        setLevel(Levels.getGameState(index));
    }
}
