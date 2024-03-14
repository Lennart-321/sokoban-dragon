import { Levels } from "../classes/Levels";
import "../css/menu.css";

export interface IMenuProps {
    setLevel: (index: number) => void;
}

export function Menu({ setLevel }: IMenuProps): JSX.Element {
    const gameButtons: JSX.Element[] = [];
    for (let i = 0; i < Levels.levels.length; i++) {
        gameButtons.push(
            <button className="menu-game-button" onClick={() => setLevel(i)}>
                Spel {i + 1}
            </button>
        );
    }

    return (
        <nav id="the-menu">
            <p className="menu-info">Välkommen att spela SOKOBAN (version Dragon)</p>
            {gameButtons}
        </nav>
    );
}
