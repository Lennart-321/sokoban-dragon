import { useEffect, useState } from 'react';
import '../css/information.css'

export interface IInformationProps {
    levelNbr: number;
    moves: number;
    pushes: number;
    running: boolean;
}

export function Information({levelNbr, moves, pushes, running}: IInformationProps):JSX.Element {
    const [seconds, setSeconds] = useState(0);  // Seconds elapsed

    useEffect(() => {
        const interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
      }, []);

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