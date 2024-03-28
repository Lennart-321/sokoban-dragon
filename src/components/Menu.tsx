import { Dispatch, SetStateAction } from "react";
import "../css/menu.css";
import { GameState } from "../classes/GameState";

export interface IMenuProps {
  setGame: Dispatch<SetStateAction<GameState | null>>;
  setShowTutorial: Dispatch<SetStateAction<boolean>>;
  setStartScreenTab: Dispatch<SetStateAction<boolean>>;
}

export function Menu({
  setGame,
  setShowTutorial,
  setStartScreenTab,
}: IMenuProps): JSX.Element {
  const handleTabPress = (tab: number) => {
    setGame(null);
    if (tab === 1) {
      setStartScreenTab(false);
    } else {
      setStartScreenTab(true);
    }
  };

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
      </div>
    </nav>
  );
}
