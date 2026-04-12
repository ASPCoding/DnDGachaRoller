import {useEffect, useState} from 'react'
import AppStore from '../stores/AppStore'
import './Glow.css';


export default function Glow({num}:{num:number}){
  const [rolling, setRolling] = useState(false)
  const [glowType, setGlowType] = useState("None")

  function changeGlow(){
    if(AppStore.getRolling()){
      if(AppStore.diceResults[num] < 3){
        if(AppStore.rollTroll()){
          setGlowType("troll")
        }else{
          setGlowType("common")
        }
      }else if(AppStore.diceResults[num] < 5){
        setGlowType("uncommon")
      }else{
        if(AppStore.rollTroll()){
          setGlowType("troll")
        }else{
          setGlowType("rare")
        }
      }
    }else{
      setGlowType("None")
    }
    if(AppStore.getRolling()){
      setTimeout(() => {
        setRolling(false)
      }, 5000)
    }
  }
  
  useEffect(() => {
    const handleRoll = () => {
      setRolling(AppStore.getRolling())
      changeGlow()
    }
    
    if(!rolling){
      setGlowType("None")
    }

    AppStore.on("toggleRoll", handleRoll)

    return () => {
      AppStore.off("toggleRoll", handleRoll)
    }
  },[rolling,glowType])
  

  return(
      <div id="glow-container">
        <div className={glowType} id="glow1"/>
        <div className={glowType} id="glow2"/>
        <div className={glowType} id="glow3"/>
        <div className={glowType} id="glow4"/>
      </div>
  )
}