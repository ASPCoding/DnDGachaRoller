import {useState, useEffect} from "react"
import AppStore from "../stores/AppStore"
import "./StatResults.css"

export default function StatResults(){
  const [results, setResults] = useState([0, 0, 0, 0, 0, 0])
  const [states, setStates] = useState([0, 0, 0, 0, 0, 0])


  function addResult(){
    setTimeout(() => {
      setResults([...AppStore.getStatResults()])
    }, 5100)
  }

  function manageStats(index: number){
    let prevIndex = AppStore.getSelectedNumber()
    if(prevIndex == index){
      if(states[index] == -1){
        AppStore.returnNumber(index)
        AppStore.setSelectedNumber(-1)
      }else{
        AppStore.removeSelectedNumber()
        AppStore.setSelectedNumber(-1)
        setResults([...AppStore.getStatResults()])
      }
      states[index] = 0;
      setStates([...states])
      updateState()
      return
    }else{
      if(prevIndex != -1 && states[prevIndex] != -1){
        states[prevIndex] = 0;
      }
      if(states[index] != -1){
        states[index] = +!states[index]
      }
    }
    AppStore.setSelectedNumber(index)
    setStates([...states])
    updateState()
    console.log(states)
  }

  function setStat(){
    console.log(states)
    states[AppStore.getSelectedNumber()] = -1;
    AppStore.setSelectedNumber(-1)
    setStates([...states])
    updateState()
  }

  function updateState(){
    AppStore.setStates(states)
  }

  function getResults(){
    setResults([...AppStore.getStatResults()])
    setStates([...AppStore.states])
  }

  useEffect(() => {
    AppStore.on("toggleRoll", addResult)
    AppStore.on("twoSelected", setStat)
    AppStore.on("updateData", getResults)

    return () => {
      AppStore.off("toggleRoll", addResult)
      AppStore.off("twoSelected", setStat)
      AppStore.off("updateData", getResults)
    }

  },[results, states])

  return(
    <>
      <div id="stat-wrapper">
        {results.map((item, index) =>
          <div className="box">
            <button className={`clicked-${states[index]}`} onClick={()=>{manageStats(index)}}>
              <h1>
                {item}
              </h1>
            </button>
          </div>
        )}
      </div>
    </>
  )
}