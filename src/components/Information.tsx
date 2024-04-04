import { useEffect, useRef, useState } from "react";
import "../css/information.css";

export interface IInformationProps {
  levelNbr: number;
  moves: number;
  pushes: number;
  backSteps: number;
  boxesOnTargets: number;
  restart: boolean;
  running: boolean;
  setRestart: React.Dispatch<React.SetStateAction<boolean>>;
  gameStopped: boolean;
  setGameStopped: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Information({
  levelNbr,
  moves,
  pushes,
  backSteps,
  boxesOnTargets,
  restart,
  running,
  setRestart,
  gameStopped,
  setGameStopped,
}: IInformationProps): JSX.Element {
  const [intervalId, setIntervalId] = useState(0); // Set interval id
  const [seconds, setSeconds] = useState(0); // Seconds elapsed
  const previousLevel = useRef(levelNbr); // Store runlevel to capture changes

  useEffect(() => {
    // Restart game
    if (restart === true) {
      setSeconds(s => s * 0);
      setRestart(false);
    }
  }, [restart]);

  useEffect(() => {
    //set timer zero
    if (gameStopped) {
      setSeconds(s => s * 0);
      setGameStopped(false);
    }
  }, [gameStopped]);

  useEffect(() => {
    // Change level
    if (levelNbr !== previousLevel.current && levelNbr > 0) {
      setSeconds(s => s * 0); // Set seconds to '0' without rerendering
      previousLevel.current = levelNbr; // Store new level number
      clearInterval(intervalId);
    }

    // Game over
    if (!running) {
      clearInterval(intervalId);
      previousLevel.current = 0; // Set to 0 to catch level changes
      return;
    }

    // Increase seconds
    const newIntervalId = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    setIntervalId(newIntervalId);
  }, [running, levelNbr]);

  const printTimeElapsed = () => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - hours * 3600) / 60);
    let sec_nbr = seconds - hours * 3600 - minutes * 60;
    // Add starting '0', if needed
    let hoursString = hours < 10 ? "0" + hours : hours;
    let minutesString = minutes < 10 ? "0" + minutes : minutes;
    let secondsString = sec_nbr < 10 ? "0" + sec_nbr : sec_nbr;

    return hoursString + ":" + minutesString + ":" + secondsString;
  };
  const score = () => {
    return 1000 * boxesOnTargets - 5 * pushes - moves - seconds - 30 * backSteps;
  };

  if (levelNbr === -1) levelNbr = 0;

  return (
    <>
      <section className="info">
        <div>Nivå: {levelNbr}</div>
        <div>Tid: {printTimeElapsed()}</div>
        <div>Steg: {moves}</div>
        <div>Flyttar: {pushes}</div>
        <div>Ångra: {backSteps}</div>
        <div>Poäng: {score()}</div>
      </section>
    </>
  );
}
