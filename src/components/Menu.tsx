import { Dispatch, SetStateAction } from "react";
import "../css/menu.css";

export interface IMenuProps {
    levelNbr: number;
    numberOfLevels: number;
    setLevel: (index: number) => void;
    setShowTutorial: Dispatch<SetStateAction<boolean>>;
}

export function Menu({ levelNbr, setLevel, numberOfLevels, setShowTutorial }: IMenuProps): JSX.Element {
    const gameButtons: JSX.Element[] = [];
    for (let i = 0; i < numberOfLevels; i++) {
        gameButtons.push(
            <button key={i} className="menu-game-button" onClick={() => setLevel(i)}>
                Nivå {i + 1}
            </button>
        );
    }

    const restartDisabled = levelNbr > 0 ? false : true;  // Disable Restart if no level

    return (
        <nav id="the-menu">
            <div className="menu-info">Välkommen att spela SOKOBAN! </div>
            <div className="btn-row">
                <button
                    className="menu-game-button"
                    disabled={restartDisabled}
                    onClick={() => setLevel(levelNbr - 1)}
                >Starta om</button>
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
