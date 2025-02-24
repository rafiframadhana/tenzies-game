import dice1 from '../assets/dice-1.png';
import dice2 from '../assets/dice-2.png';
import dice3 from '../assets/dice-3.png';
import dice4 from '../assets/dice-4.png';
import dice5 from '../assets/dice-5.png';
import dice6 from '../assets/dice-6.png';

export default function Die(props) {

    const diceImages = [null, dice1, dice2, dice3, dice4, dice5, dice6];

    return (
        <button className="dice-button" style={{backgroundColor: props.isHeld && '#59E391'}}
                onClick={props.toggleIsHeld}
        >
            <img src={diceImages[props.value]} width="50" height="50"/>
        </button>
    )
}