import {useState, useEffect} from "react"
import AppStore from "../stores/AppStore"
import "./StatResults.css"

export default function StatResults(){
  const [results, setResults] = useState([0, 0, 0, 0, 0, 0])

  function addResult(){
    setTimeout(() => {
      setResults([...AppStore.getStatResults()])
    }, 5100)
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
        {results.map((item) =>
          <div className="box">
            <h1>{item}</h1>
          </div>
        )}
      </div>
    </>
  )
}