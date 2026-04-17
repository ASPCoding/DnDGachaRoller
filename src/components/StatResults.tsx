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
    if(prevIndex != index){
      states[prevIndex] = ~states[prevIndex]
      AppStore.setSelectedNumber(index)
    }else{
      if(states[index] == -1){
        AppStore.returnNumber()
      }else{
        AppStore.removeSelectedNumber()
        setResults([...AppStore.getStatResults()])
      }
    }
    states[index] = ~states[index]
    setStates([...states])
  }

  function setStat(){
    states[AppStore.getSelectedNumber()] = -1;
  }

  useEffect(() => {
    AppStore.on("toggleRoll", addResult)
    AppStore.on("twoSelected", setStat)

    return () => {
      AppStore.off("toggleRoll", addResult)
      AppStore.off("twoSelected", setStat)
    }

  },[results])

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