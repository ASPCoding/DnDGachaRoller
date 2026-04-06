import { useState, useEffect, useRef } from 'react'
import AppStore from '../stores/AppStore'
import "./Dice.css"


export default function Dice(){
  const [rolling, setRolling] = useState(true)
  
  useEffect(() => {
    const toggleRoll = () => {
      setRolling(AppStore.rolling)
    }
    
    AppStore.on("toggleRoll", toggleRoll)

    return () => {
      AppStore.off("toggleRoll", toggleRoll)
    }
  },[rolling])

  function RollingDice(){
    return(
      <svg id="die" viewBox="0 0 100 100">
        <path id="hexagon"/>
      </svg>
    );
  }

  function StationaryDice(){
    return(
      <svg id="square" viewBox="0 0 100 100">
        <path id="square-border"/>
      </svg>
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

        <div id="num-wrapper">
          <p>er?</p>
        </div>
      </div>
    </>
  )
}