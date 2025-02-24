import Die from "./components/Die"
import { useState, useEffect, useRef } from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import winningSound from "./assets/winning-sound.mp3";

function App() {

  const [dice, setDice] = useState(() => generateAllNewDice())
  const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value)
  const audioRef = useRef(null);
  const buttonRef = useRef(null)

  useEffect(() => {
    if (gameWon) {
      if (!audioRef.current) {
        audioRef.current = new Audio(winningSound);
        audioRef.current.volume = 0.1;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    }
  }, [gameWon]);

  useEffect(()=>{
    if(gameWon){
      buttonRef.current.focus()
    }
  }, [gameWon])


  function generateAllNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * 6) + 1
      newDice.push({ value: randomNum, id: nanoid(), isHeld: false })
    }
    return newDice;
  }


  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice())
    }
    else {
      setDice(prevDice => prevDice.map(die =>
        die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      ))
    }

  }


  function hold(id) {
    setDice(prevDice => prevDice.map(die =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ))
  }


  const dieElements = dice.map((die) =>
    <Die key={die.id} value={die.value} isHeld={die.isHeld} toggleIsHeld={() => hold(die.id)} />
  )

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dieElements}
      </div>

      <button ref={buttonRef} className="roll-button" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App
