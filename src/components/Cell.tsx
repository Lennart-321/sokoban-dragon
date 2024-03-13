import "../css/cell.css";

interface ICellProps {
  state: number;
}

export function Cell({ state }: ICellProps): JSX.Element {
  let className: string = "";
  switch (state) {
    case 1:
      className = "player";
      break;
    case 8:
      className = "wall";
      break;
    case 0:
      className = "empty";
      break;

    case 2:
      className = "box";
      break;
    case 4:
      className = "target";
      break;
    case 6:
      className = "box-on-target";
      break;
    case 5:
      className = "player-on-target";
      break;
  }
  return (
    <>
      <div className={className}></div>
    </>
  );
}
