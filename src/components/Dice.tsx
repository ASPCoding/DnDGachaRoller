import { useState, useEffect } from 'react'
import Glow from './Glow'
import AppStore from '../stores/AppStore'
import "./Dice.css"

export default function Dice({num}:{num:number}){
  const [rolling, setRolling] = useState(false)

  function setTimer(){
    if(AppStore.getRolling()){
        setTimeout(() => {
          setRolling(false)
        }, 5000)
      }
  }

  useEffect(() => {
    const toggleRoll = () => {
      setRolling(AppStore.getRolling())
      console.log(AppStore.getRolling())
      setTimer()
    }
    
    AppStore.on("toggleRoll", toggleRoll)

    return () => {
      AppStore.off("toggleRoll", toggleRoll)
    }
  },[rolling])

  function RollingDice(){
    return(
      <>
        <svg id="die" viewBox="0 0 100 100">
          <path id="hexagon"/>
        </svg>
      </>
      
    );
  }

  function StationaryDice(){
    return(
      <>
        <svg id="square" viewBox="0 0 100 100">
          <path id="square-border"/>
        </svg>
        <div id="num-wrapper">
          <p>{AppStore.diceResults[num]}</p>
        </div>
      </>
      
    )
  }

  function CurrentDice(){
    let currDice = (<div></div>);
    if(rolling){
      currDice = RollingDice();
    }else{
      currDice = StationaryDice();
    }
    return currDice;
  }

  return(
    <>
      <div id="die-wrapper">
        <CurrentDice/>
        <Glow num={num}/>
      </div>
    </>
  )
}