import { Dispatch, SetStateAction } from "react";
import "../css/tutorial.css";
import StartScreen from "./StartScreen";

export interface ITutorial {
    showTutorial: boolean;
    setShowTutorial: Dispatch<SetStateAction<boolean>>;
}

export function Tutorial({ showTutorial, setShowTutorial }: ITutorial) {
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
                    <StartScreen />
                </div>
            </div>
        </>
    ) : (
        <></>
    );
}
