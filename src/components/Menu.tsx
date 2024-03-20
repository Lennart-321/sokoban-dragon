import { Dispatch, SetStateAction } from "react";
import "../css/menu.css";

export interface IMenuProps {
    numberOfLevels: number;
    setLevel: (index: number) => void;
    setShowTutorial: Dispatch<SetStateAction<boolean>>;
}

export function Menu({ setLevel, numberOfLevels, setShowTutorial }: IMenuProps): JSX.Element {
    const gameButtons: JSX.Element[] = [];
    for (let i = 0; i < numberOfLevels; i++) {
        gameButtons.push(
            <button key={i} className="menu-game-button" onClick={() => setLevel(i)}>
                Nivå {i + 1}
            </button>
        );
    }

    return (
        <nav id="the-menu">
            <div className="menu-info">Välkommen att spela SOKOBAN! </div>
            <div className="btn-row">
                {gameButtons}
                <button
                    className="menu-game-button btn-help"
                    onClick={() => {
                        setShowTutorial(true);
                    }}
                >
                    Hjälp
                </button>
            </div>
        </nav>
    );
}
