import { Dispatch, SetStateAction } from "react";
import "../css/menu.css";

export interface IMenuProps {
  setShowTutorial: Dispatch<SetStateAction<boolean>>;
  setStartScreenTab: Dispatch<SetStateAction<boolean>>;
}

export function Menu({
  setShowTutorial,
  setStartScreenTab,
}: IMenuProps): JSX.Element {
  const handleTabPress = (tab: number) => {
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
          Hur man spelar
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
