import Dice from "./Dice"
import AppStore from "../stores/AppStore"
import './DiceRoller.css'

function randomize(){
  AppStore.randomize();
  AppStore.toggleRoll();
  console.log(AppStore.diceResults)
}

export default function DiceRoller(){
  return(
    <>
      <div id="roller-wrapper">
        <div id="dice">
          <Dice num={0}/>
          <Dice num={1}/>
          <Dice num={2}/>
          <Dice num={3}/>
        </div>
        <div>
          <button onClick={randomize}> Roll All</button>
        </div>
      </div>
    </>
  )
}