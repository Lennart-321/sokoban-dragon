import '../css/StartScreen.css'

function StartScreen(){
    return(
        <>
            <section className="container">
                <div className="instruction">
                    <div className="text">
                        Spelet går ut på att flytta alla lådor till målrutorna.
                    </div>
                    <div className="strip">
                        <img src="./src/img/spr_box.png" alt="" />
                        <img src="./src/img/spr_arrow.png" alt="" />
                        <img src="./src/img/spr_spot.png" alt="" />
                        <img src="./src/img/spr_equals.png" alt="" />
                        <img src="./src/img/spr_box_placed.png" alt="" />

                    </div>
                </div>
                <div className="instruction">
                    <div className="text">
                        Lagerarbetaren hjälper dig flytta på lådorna.
                    </div>
                    <div className="strip">
                        <img src="./src/img/spr_player_right.png" alt="" />
                        <img src="./src/img/spr_box.png" alt="" />
                        <img src="./src/img/spr_arrow.png" alt="" />

                    </div>
                </div>
                <div className="instruction">
                    <div className="text">
                        Flytta lagerarbetaren med piltangenterna.
                    </div>
                    <div className="strip">
                        <img src="./src/img/spr_arrow_keys.png" alt="" />
                        <img src="./src/img/spr_player_up.png" alt="" />
                        <img src="./src/img/spr_player_right.png" alt="" />
                        <img src="./src/img/spr_player_down.png" alt="" />
                        <img src="./src/img/spr_player_left.png" alt="" />
                    </div>
                </div>
                <div className="instruction">
                    <div className="text">
                        Det går bara att flytta en låda åt gången.
                    </div>
                    <div className="strip">
                        <img src="./src/img/spr_player_right.png" alt="" />
                        <img src="./src/img/spr_two_boxes.png" alt="" />
                    </div>
                </div>
                <div className="instruction">
                    <div className="text">
                        Lycka till!
                    </div>
                </div>
            </section>
        </>
    );
}

export default StartScreen;