import StatBox from "./StatBox"
import "./Stats.css"

export default function Stats() {
  return(
    <>
      <div id="stats-wrapper">
        <StatBox name="Strength"/>
        <StatBox name="Dexterity"/>
        <StatBox name="Constitution"/>
        <StatBox name="Intelligence"/>
        <StatBox name="Wisdom"/>
        <StatBox name="Charisma"/>
      </div>
    </>
  )
}