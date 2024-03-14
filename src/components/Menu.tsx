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
}
