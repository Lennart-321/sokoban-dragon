import "../css/StartScreen.css";
import "../css/levelSelect.css";
import "../css/tutorial.css";

interface IStartScreenProps {
  numberOfLevels: number;
  setLevel: (index: number) => void;
  showStartScreenTab: boolean;
}

function StartScreen({ setLevel, numberOfLevels, showStartScreenTab }: IStartScreenProps): JSX.Element {
  const startTutorial: JSX.Element = (
    <section className="start-container">
      <div className="instruction">
        <div className="text">Spelet går ut på att flytta alla lådor till målrutorna.</div>
        <div className="strip">
          <img src="./src/img/spr_box.png" alt="" />
          <img className="arrow" src="./src/img/spr_arrow.png" alt="" />
          <img src="./src/img/spr_spot.png" alt="" />
          <img className="equals" src="./src/img/spr_equals.png" alt="" />
          <img src="./src/img/spr_box_placed.png" alt="" />
        </div>
      </div>
      <div className="instruction">
        <div className="text">Lagerarbetaren hjälper dig flytta på lådorna.</div>
        <div className="strip">
          <img src="./src/img/spr_player_right.png" alt="" />
          <img src="./src/img/spr_box.png" alt="" />
          <img className="arrow" src="./src/img/spr_arrow.png" alt="" />
        </div>
      </div>
      <div className="instruction">
        <div className="text">Flytta lagerarbetaren med piltangenterna.</div>
        <div className="strip">
          <img className="arrow" src="./src/img/spr_arrow_keys.png" alt="" />
          <img src="./src/img/spr_player_up.png" alt="" />
          <img src="./src/img/spr_player_right.png" alt="" />
          <img src="./src/img/spr_player_down.png" alt="" />
          <img src="./src/img/spr_player_left.png" alt="" />
        </div>
      </div>
      <div className="instruction">
        <div className="text">Det går bara att flytta en låda åt gången.</div>
        <div className="strip">
          <img src="./src/img/spr_player_right.png" alt="" />
          <img src="./src/img/spr_two_boxes.png" alt="" />
        </div>
      </div>
      <div className="instruction">
        <div className="text">Lycka till!</div>
      </div>
    </section>
  );

  const gameButtons: JSX.Element[] = [];
  let highestLevel: number;
  const storedValue = localStorage.getItem("highestLevel");

  if (storedValue !== null) {
    highestLevel = parseInt(storedValue);
  } else {
    highestLevel = 0;
  }

  for (let i = 0; i < numberOfLevels; i++) {
    const isDisabled = i > highestLevel;
    gameButtons.push(
      <button key={i} className="menu-game-button" onClick={() => setLevel(i)} disabled={isDisabled}>
        Nivå {i + 1}
      </button>
    );
  }
  const levels: JSX.Element = (
    <div className="level-container">
      <section className="game-buttons">{gameButtons}</section>
    </div>
  );
  return <>{showStartScreenTab ? levels : startTutorial}</>;
}

export default StartScreen;
