export default function Die(props) {

    return (
        <button className="dice-button" style={{backgroundColor: props.isHeld && '#59E391'}}
                onClick={props.toggleIsHeld}
        >
            <img src={`/tenzies-game/src/assets/dice-${props.value}.png`} width="50" height="50"/>
        </button>
    )
}