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
  }
  return (
    <>
      <div className={className}></div>
    </>
  );
}
