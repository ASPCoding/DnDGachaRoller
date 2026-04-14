import Number from "./Number"
import AppStore from "../stores/AppStore"
import "./DiceCalculation.css"

export default function DiceCalculation(){
  return (
    <>
      <div id="calculation-wrapper">
        <Number num={0}/>
        <h1>+</h1>
        <Number num={1}/>
        <h1>+</h1>
        <Number num={2}/>
        <h1>+</h1>
        <Number num={3}/>
        <h1>=</h1>
        <h1>{AppStore.getDiceResult()}</h1>
      </div>
    </>
  )
}