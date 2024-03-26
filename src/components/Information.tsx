import { useEffect, useRef, useState } from "react";
import "../css/information.css";
import { GameState } from "../classes/GameState";

export interface IInformationProps {
  game: GameState | null;
  // levelNbr: number;
  // moves: number;
  // pushes: number;
  // running: boolean;
}

// BUG - Information.tsx can't restart the same index again without gameover before!
// And it can't handle click on 'Help' button!

export function Information({ game }: IInformationProps): JSX.Element {
  const [refreshCount, setRefreshCount] = useState(0);
  const intervalId = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (game?.isRunning()) {
      intervalId.current = setInterval(() => {
        setRefreshCount(c => c + 1);
      }, 1000);
    }
  }, [game?.isRunning()]);

  if (!game?.isRunning() && intervalId !== undefined) {
    clearInterval(intervalId.current);
    intervalId.current = undefined;
  }

  const printTimeElapsed = (game: GameState | null, now: Date | null) => {
    const seconds = game && now ? Math.floor((now.getTime() - game.startTime.getTime()) / 1000) : 0;
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - hours * 3600) / 60);
    let sec_nbr = seconds - hours * 3600 - minutes * 60;
    // Add starting '0', if needed
    let hoursString = hours < 10 ? "0" + hours : hours;
    let minutesString = minutes < 10 ? "0" + minutes : minutes;
    let secondsString = sec_nbr < 10 ? "0" + sec_nbr : sec_nbr;

    return hoursString + ":" + minutesString + ":" + secondsString;
  };

  const now = game?.isRunning() ? new Date() : null;
  return (
    <>
      <section className="info">
        <div>Nivå: {game?.level ?? 0}</div>
        <div>Tid: {printTimeElapsed(game, now)}</div>
        <div>Steg: {game?.moves ?? 0}</div>
        <div>Flyttar: {game?.pushes ?? 0}</div>
        <div>Ångra: {game?.backSteps ?? 0}</div>
        <div>Poäng: {game?.score(now) ?? 0}</div>
      </section>
    </>
  );
}
