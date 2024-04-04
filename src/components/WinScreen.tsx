import '../css/WinScreen.css'

function WinScreen(){
    return(
        <>
            <div className="win-screen">
                <div className="win-text">
                    <h1>BRA JOBBAT!</h1>
                    <h2>Du klarade nivå 1!</h2>
                </div>
                <div className="player-box">
                    <img src="./src/img/spr_player_right.png" alt="" />
                    <img src="./src/img/spr_box_placed.png" alt="" />
                </div>
            </div>
        </>
    );
}

export default WinScreen;