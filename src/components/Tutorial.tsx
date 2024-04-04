import { Dispatch, SetStateAction } from "react";
import "../css/tutorial.css";
import StartScreen from "./StartScreen";

export interface ITutorial {
    numberOfLevels: number;
    setLevel: () => void;
    setShowTutorial: Dispatch<SetStateAction<boolean>>;
    setStartScreenTab: Dispatch<SetStateAction<boolean>>;
    showStartScreenTab: boolean;
    showTutorial: boolean;
}

export function Tutorial({numberOfLevels, setLevel, showStartScreenTab, setStartScreenTab, showTutorial, setShowTutorial }: ITutorial) {
    // Hinder modal closing if click on the modal
    const stopClosing = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    }

    return showTutorial ? (
        <>
            <div id="tutorial-modal-outer" onClick={() => setShowTutorial(false)}>
                <div id="tutorial-modal-inner" onClick={(e) => stopClosing(e)}>
                    <h3 className="header">
                        Instruktioner
                        <span className="close" onClick={() => setShowTutorial(false)}>&times;</span>
                    </h3>
                    <StartScreen setLevel={setLevel} numberOfLevels={numberOfLevels} showStartScreenTab={showStartScreenTab} setStartScreenTab={setStartScreenTab} />
                </div>
            </div>
        </>
    ) : (
        <></>
    );
}
