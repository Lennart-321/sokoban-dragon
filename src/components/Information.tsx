import { useEffect, useState } from 'react';
import '../css/information.css'

export interface IInformationProps {
    levelNbr: number;
    moves: number;
    pushes: number;
}

export function Information({levelNbr: levelNbr, moves, pushes}: IInformationProps):JSX.Element {
    // console.log('level: ' + level);
    const [running, setRunning] = useState(true);  // DUMMY - level not finished
    const [seconds, setSeconds] = useState(0);  // Seconds elapsed

    useEffect(() => {
        if (running) {  // Adding elapsed seconds
            setTimeout(() => {
                setSeconds((s) => s + 1);
            }, 1000);
        }
    });

    const printTimeElapsed = () => {
        // console.log('sec: ' + seconds);
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
        {/* DUMMY button */}
        <button onClick={() => setRunning(!running)} style={{marginBottom: "20px"}}>{running ? "Paus" : "Resume"} running</button>

        <section className="info">
            <div>Level: {levelNbr}</div>
            <div>Time: {printTimeElapsed()}</div>   
            <div>Moves: {moves}</div>
            <div>Pushes: {pushes}</div>
        </section>
    </>)
}