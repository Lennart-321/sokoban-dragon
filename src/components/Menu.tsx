import { Dispatch, SetStateAction } from "react";
import "../css/menu.css";
import { GameState } from "../classes/GameState";

export interface IMenuProps {
  levelNbr: number;
  setLevel: (index: number) => void;
  setGame: Dispatch<SetStateAction<GameState | null>>;
  setShowTutorial: Dispatch<SetStateAction<boolean>>;
  setStartScreenTab: Dispatch<SetStateAction<boolean>>;
}

export function Menu({ setGame, setShowTutorial, setStartScreenTab, levelNbr, setLevel }: IMenuProps): JSX.Element {
  const restartDisabled = levelNbr > 0 ? false : true; // Disable Restart if no level
  const handleTabPress = (tab: number) => {
    setGame(null);
    if (levelNbr >= 0) setLevel(-1);
    if (tab === 1) {
      setStartScreenTab(false);
    } else {
      setStartScreenTab(true);
    }
  };


/*
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
                    Instruktioner
                </button>
            </div>
        </nav>
    );
*/

  return (
    <nav id="the-menu">
      <div className="menu-info">Välkommen att spela SOKOBAN! </div>
      <div className="btn-row">
        <button className="menu-game-button" onClick={() => handleTabPress(1)}>
          Start
        </button>
        <button className="menu-game-button" onClick={() => handleTabPress(2)}>
          Nivåer
        </button>
        <button
          className="menu-game-button btn-help"
          onClick={() => {
            setShowTutorial(true);
          }}
        >
          Hjälp
        </button>
        <button className="menu-game-button" disabled={restartDisabled} onClick={() => setLevel(levelNbr - 1)}>
          Starta om
        </button>
      </div>
    </nav>
  );

}
