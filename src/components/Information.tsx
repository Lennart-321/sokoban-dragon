import { useEffect, useRef, useState } from 'react';
import '../css/information.css'

export interface IInformationProps {
    levelNbr: number;
    moves: number;
    pushes: number;
    running: boolean;
}

    // BUG - Information.tsx can't restart the same index again without gameover before!
    // And it can't handle click on 'Help' button!

export function Information({levelNbr, moves, pushes, running}: IInformationProps):JSX.Element {
    const [intervalId, setIntervalId] = useState(0);  // Set interval id
    const [seconds, setSeconds] = useState(0);  // Seconds elapsed
    const previousLevel = useRef(levelNbr);   // Storage of runlevel to capture changes
        
    useEffect(() => {
        if (levelNbr !== previousLevel.current) {
            setSeconds(s => s - seconds);  // Set seconds to '0' without rerendering
            previousLevel.current = levelNbr;  // Update level storage
            clearInterval(intervalId);
        }

        if (!running) {  // No game started or game over
            clearInterval(intervalId);
            previousLevel.current = 0;
            return;
        }

        const newIntervalId = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);

        setIntervalId(newIntervalId);
    }, [running, levelNbr]);

    const printTimeElapsed = () => {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds - (hours * 3600)) / 60);
        let sec_nbr = seconds - (hours * 3600) - (minutes * 60);
        // Add starting '0', if needed
        let hoursString = hours < 10 ? "0" + hours : hours;
        let minutesString = minutes < 10 ? "0" + minutes : minutes;
        let secondsString = sec_nbr < 10 ? "0" + sec_nbr : sec_nbr;

        return hoursString + ":" + minutesString + ":" + secondsString;
    }

    return (
        <>
            <section className="info">
                <div>Nivå: {levelNbr}</div>
                <div>Tid: {printTimeElapsed()}</div>   
                <div>Steg: {moves}</div>
                <div>Flyttar: {pushes}</div>
            </section>
        </>)
}