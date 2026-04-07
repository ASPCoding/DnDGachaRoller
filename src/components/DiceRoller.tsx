import Dice from "./Dice"
import AppStore from "../stores/AppStore"

function randomize(){
  AppStore.randomize();
  AppStore.toggleRoll();
  console.log(AppStore.diceResults)
  console.log(AppStore.rolling)
}

export default function DiceRoller(){
  return(
    <>
      <div>
        <Dice num={0}/>
        <Dice num={1}/>
        <Dice num={2}/>
        <Dice num={3}/>
        <button onClick={randomize}></button>
      </div>
    </>
  )
}