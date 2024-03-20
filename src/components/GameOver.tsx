import '../css/gameOver.css'

export interface IGameOverProps {
    running: boolean;
    levelNbr: number;
}


export function GameOver({running, levelNbr}: IGameOverProps) {
    // console.log('GameOver - running: ' + running);

    return  !running && levelNbr > 0 ? (
        <>
            <section className="bg-game-over">
                <div className='game-over-msg'>
                    Du löste nivå {levelNbr}!
                </div>
            </section>
        </>
    ) : (
    <></>
    )
}