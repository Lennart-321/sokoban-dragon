import { useEffect, useState } from "react";
import { GameState } from "../classes/GameState";
import "../css/gameBoard.css";
import { Cell } from "./Cell";
import { GameEngine } from "../classes/GameEngine";

interface IGameBoardProps {
  game: GameState;
  handlePush: () => void;
  handleMove: () => void;
}

export function GameBoard({
  game,
  handleMove,
  handlePush,
}: IGameBoardProps): JSX.Element {
  const [refresh, setRefresh] = useState(0);

  const handleKeyDown = (key: string) => {
    if (
      key === "ArrowDown" ||
      key === "ArrowRight" ||
      key === "ArrowLeft" ||
      key === "ArrowUp"
    ) {
      game.board = GameEngine.movePlayer(key, game, handleMove, handlePush);
      game.findPlayer();
      setRefresh((c) => c + 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      handleKeyDown(e.key);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
  const jsxElement: JSX.Element[] = [];
  console.log(game.board);
  for (let i = 0; i < game.board.length; i++) {
    for (let j = 0; j < game.board[i].length; j++) {
      jsxElement.push(<Cell state={game.board[i][j]} />);
    }
  }

  return (
    <>
      <div
        className="game-board"
        style={{
          width: `${game.width * 64}px`,
          height: `${game.height * 64}px`,
          gridTemplateColumns: `repeat(${game.width}, 1fr)`,
          gridTemplateRows: `repeat(${game.height}, 1fr)`,
        }}
      >
        {jsxElement}
      </div>
    </>
  );
}
