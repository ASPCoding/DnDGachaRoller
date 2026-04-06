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
        <Dice/>
        <Dice/>
        <Dice/>
        <Dice/>
        <button onClick={randomize}></button>
      </div>
    </>
  )
}