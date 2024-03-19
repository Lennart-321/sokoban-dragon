import { useRef } from "react";
import "../css/cell.css";

interface ICellProps {
  state: number;
  step: number[];
}

export function Cell({ state, step }: ICellProps): JSX.Element {
  const innerCellDiv: any = useRef();

  let bgClassName: string = "";
  let className: string = "";
  let showAnimation = false;
  switch (state) {
    case 1:
      showAnimation = !!innerCellDiv.current; // true;
      className = "player"; //"player cell-inner" + (showAnimation ? "-start" : "");
      bgClassName = "empty cell-animation-outer";
      break;
    case 2:
      className = "box";
      bgClassName = "empty";
      break;
    case 4:
      className = "target";
      bgClassName = "empty";
      break;
    case 5:
      showAnimation = !!innerCellDiv.current; // true;
      className = "player"; //"player cell-inner" + (showAnimation ? "-start" : "");
      bgClassName = "target cell-animation-outer";
      break;
    case 6:
      className = "box-ok";
      bgClassName = "empty";
      break;
    case 8:
      className = "wall";
      bgClassName = "empty";
      break;
    case 0:
      className = "empty"; // emptyBkgCls;
      bgClassName = ""; //"empty"; // emptyBkgCls;
      break;
    case 9:
      className = "black";
      bgClassName = "black";
  }

  let style = {};
  if (showAnimation) {
    let innerClass = "cell-inner-start-" + step[0] + step[1];
    className += " " + innerClass;
    bgClassName += " cell-animation-outer";
    console.log("Last step ", step, " Class: ", className);

    //style = { position: "absolute", right: step[0] * 64 + "px", bottom: step[1] * 64 + "px" };

    setTimeout(() => {
      // innerCellDiv.current.style = { position: "absolute", right: 0, bottom: 0, transitionDuration: "200ms" };
      innerCellDiv.current.classList.remove(innerClass);
      innerCellDiv.current.classList.add("cell-inner");
    }, 0);
    console.log(style);
  }

  return (
    <>
      <div className={bgClassName}>
        <div ref={innerCellDiv} className={className}></div>
      </div>
    </>
  );
}
