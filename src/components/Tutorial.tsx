import { Dispatch, SetStateAction } from "react";
import "../css/tutorial.css";
export interface ITutorial {
    showTutorial: boolean;
    setShowTutorial: Dispatch<SetStateAction<boolean>>; // (show: boolean) => void;
}

export function Tutorial({ showTutorial, setShowTutorial }: ITutorial) {
    return showTutorial ? (
        <>
            <div id="tutorial-modal-outer" onClick={() => setShowTutorial(false)}>
                <div id="tutorial-modal-inner">
                    <span className="close">&times;</span>
                    <p>Spelet går ut på att flytta alla lådor till målrutorna.</p>
                    <p>Flytta på lådorna genom att putta på dom med den lille mannen.</p>
                    <p>Flytta den lille mannen med pil-tangenterna.</p>
                    <p>Det går bara att flytta en låda åt gången.</p>
                    <p>Lycka till!</p>
                </div>
            </div>
        </>
    ) : (
        <></>
    );
}
