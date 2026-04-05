import StatBox from "./StatBox"
import "./Stats.css"

export default function Stats() {
  return(
    <>
      <div id="stats-wrapper">
        {StatBox("Strength")}
        {StatBox("Dexterity")}
        {StatBox("Constitution")}
        {StatBox("Intelligence")}
        {StatBox("Wisdom")}
        {StatBox("Charisma")}
      </div>
    </>
  )
}