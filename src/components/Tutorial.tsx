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
                    <div className="creater-container">
                        <h3 className="header">Spelet skapades 2024 vid ett grupparbete i React av:</h3>
                        <div className="creaters">
                            <div className="name">Anders Stenhammar</div>
                            <div className="name">Göran Olson</div>
                            <div className="name">Johan Edvardsson</div>
                            <div className="name">Lennart Skagerling</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <></>
    );
}
