import {useEffect, useState} from "react"
import AppStore from "../stores/AppStore"
import "./Number.css"

export default function Number({num}: {num: number}){
  const [crossout, setCrossout] = useState("None")

  function changeCrossout(){
    setCrossout("None")
    if(num == AppStore.getIndexOfLowest()){
      setCrossout("crossout")
    }
  }
  
  useEffect(() => {
    AppStore.on("toggleRoll", changeCrossout)

    return () => {
      AppStore.off("toggleRoll", changeCrossout)
    }
  },[])

  return(
    <>
      <div id="number-wrapper">
        <h1 id="number">{AppStore.diceResults[num]}</h1>
        <div id={crossout}/>
      </div>
    </>
  )
}