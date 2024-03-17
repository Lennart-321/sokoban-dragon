import "../css/menu.css";

export interface IMenuProps {
    numberOfLevels: number;
    setLevel: (index: number) => void;
}

export function Menu({ setLevel, numberOfLevels }: IMenuProps): JSX.Element {
    const gameButtons: JSX.Element[] = [];
    for (let i = 0; i < numberOfLevels; i++) {
        gameButtons.push(
            <button className="menu-game-button" onClick={() => setLevel(i)}>
                Level {i + 1}
            </button>
        );
    }

    return (
        <nav id="the-menu">
            <p className="menu-info">Välkommen att spela SOKOBAN! </p>
            {gameButtons}
        </nav>
    );
}
