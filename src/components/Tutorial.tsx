import { Dispatch, SetStateAction } from "react";
import "../css/tutorial.css";
import StartScreen from "./StartScreen";
export interface ITutorial {
    showTutorial: boolean;
    setShowTutorial: Dispatch<SetStateAction<boolean>>;
}

export function Tutorial({ showTutorial, setShowTutorial }: ITutorial) {
    const stopClosing = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    }

    return showTutorial ? (
        <>
            <div id="tutorial-modal-outer" onClick={() => setShowTutorial(false)}>
                <span className="close">&times;</span>
                <div id="tutorial-modal-inner" onClick={ (e) => stopClosing(e) }>
                    <span className="close" onClick={() => setShowTutorial(false)}>&times;</span>
                    <h3 className="header">Instruktioner</h3>
                    <StartScreen />
                    <div className="creater-container">
                        <h3>Spelet skapades av:</h3>
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
