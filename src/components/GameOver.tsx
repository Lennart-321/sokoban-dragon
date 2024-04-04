import '../css/gameOver.css'

export interface IGameOverProps {
    running: boolean;
    levelNbr: number;
}


export function GameOver({running, levelNbr}: IGameOverProps) {
    // console.log('GameOver - running: ' + running);

    return  !running && levelNbr > 0 ? (
        <>
            <div className="win-screen">
                <div className="win-text">
                    <h1>BRA JOBBAT!</h1>
                    <h2>Du klarade nivå {levelNbr}!</h2>
                </div>
                <div className="player-box">
                    <img src="./src/img/spr_player_right.png" alt="" />
                    <img src="./src/img/spr_box_placed.png" alt="" />
                </div>
            </div>
        </>
    ) : (
    <></>
    )
}