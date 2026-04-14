import {useEffect, useState} from "react"
import Dice from "./Dice"
import DiceCalculation from "./DiceCalculation"
import AppStore from "../stores/AppStore"
import './DiceRoller.css'

function randomize(){
  AppStore.randomize();
  AppStore.toggleRoll();
  console.log(AppStore.diceResults)
}

export default function DiceRoller(){
  const [rolling, setRolling] = useState(false)

  function toggleRoll(){
    setTimeout(() => {
      AppStore.toggleRoll()
    },5000)
  }

  useEffect(() => {
    function updateRolling(){
      setRolling(AppStore.getRolling())
      if(AppStore.getRolling()){
        toggleRoll()
      }
    }
    AppStore.on("toggleRoll", updateRolling)

    return () => {
      AppStore.off("toggleRoll", updateRolling)
    }
  },[rolling])

  return(
    <>
      <div id="roller-wrapper">
        <div id="dice">
          <Dice num={0}/>
          <Dice num={1}/>
          <Dice num={2}/>
          <Dice num={3}/>
        </div>
        <div id="controller-wrapper">
          <DiceCalculation/>
          <button onClick={randomize}> Roll All</button>
        </div>
      </div>
    </>
  )
}