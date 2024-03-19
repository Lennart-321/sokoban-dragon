import { useRef } from "react";
import "../css/cell.css";

interface ICellProps {
  state: number;
}

export function Cell({ state }: ICellProps): JSX.Element {
  const innerCellDiv: any = useRef();

  let bgClassName: string = "";
  let className: string = "";
  let showAnimation = false;
  switch (state) {
    case 1:
      showAnimation = !!innerCellDiv.current; // true;
      className = "player cell-inner" + (showAnimation ? "-start" : "");
      bgClassName = "empty  cell-outer";
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
      className = "player cell-inner" + (showAnimation ? "-start" : "");
      bgClassName = "target cell-outer";
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

  if (showAnimation) {
    setTimeout(() => {
      innerCellDiv.current.classList.remove("cell-inner-start");
      innerCellDiv.current.classList.add("cell-inner");
    }, 0);
  }

  return (
    <>
      <div className={bgClassName}>
        <div ref={innerCellDiv} className={className}></div>
      </div>
    </>
  );
}
