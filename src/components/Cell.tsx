import "../css/cell.css";

interface ICellProps {
  state: number;
}

export function Cell({ state }: ICellProps): JSX.Element {
  let bgClassName: string = "";
  let className: string = "";
  switch (state) {
    case 1:
      className = "player";
      bgClassName = "empty";
      break;
    case 2:
      className = "box";
      bgClassName = "empty";
      break;
    case 4:
      className = "target";
      bgClassName = "target";
      break;
    case 5:
      className = "player-target";
      bgClassName = "target";
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
      className = "empty";
      bgClassName = "empty";
      break;
    case 9:
      className = "black";
      bgClassName = "empty";
  }

  return (
    <>
      <div className={bgClassName}>
        <div className={className}></div>
      </div>
    </>
  );
}
