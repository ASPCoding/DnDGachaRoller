import DiceRoller from './DiceRoller'
import StatResults from './StatResults'
import "./StatSetter.css"

export default function StatSetter(){
  return(
    <>
      <div id="right-wrapper">
        <DiceRoller/>
        <StatResults/>
      </div>
    </>
  )
}