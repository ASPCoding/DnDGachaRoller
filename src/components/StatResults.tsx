import {useState, useEffect} from "react"
import AppStore from "../stores/AppStore"
import "./StatResults.css"

export default function StatResults(){
  const [results, setResults] = useState([0, 0, 0, 0, 0, 0])
  const [states, setStates] = useState([false,false,false,false,false,false])


  function addResult(){
    setTimeout(() => {
      setResults([...AppStore.getStatResults()])
    }, 5100)
  }
  
  function manageStats(index: number){
    states[index] = !states[index]
    setStates([...states])
  }

  useEffect(() => {
    AppStore.on("toggleRoll", addResult)

    return () => {
      AppStore.off("toggleRoll", addResult)
    }

  },[results])

  return(
    <>
      <div id="stat-wrapper">
        {results.map((item, index) =>
          <div className="box">
            <button className={`clicked-${states[index]}`} onClick={()=>{manageStats(index)}}>{item}</button>
          </div>
        )}
      </div>
    </>
  )
}