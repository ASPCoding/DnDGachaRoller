import {useEffect, useState} from "react"
import AppStore from "../stores/AppStore"
import "./StatBox.css"

export default function stat_box({name}:{name: string}){
  const [value, setValue] = useState("-")
  const [selected, setSelected] = useState(false)

  function handleClick(){
    setSelected(!selected)
    if(!selected){
      AppStore.setSelectedStat(name)
    }else{
      AppStore.setSelectedStat("")
    }
  }

  function updateSelected(){
    if(AppStore.getSelectedStat() != name){
      setSelected(false)
      setValue(AppStore.getStat(name))
    }
  }

  function setStat(){
    if(AppStore.getSelectedStat() == name){
      setValue(String(AppStore.getSelectedStatNumber()))
      setSelected(false)
    }
  }

  function createUpdated(){
    setValue(AppStore.getStat(name))
    setSelected(false)
  }

  useEffect(() => {
    AppStore.on("statSelected", updateSelected)
    AppStore.on("twoSelected", setStat)
    AppStore.on("updateData", createUpdated)

    return () => {
      AppStore.off("statSelected", updateSelected)
      AppStore.off("twoSelected", setStat)
      AppStore.off("updateData", createUpdated)
    }
  },[])

  return(
    <>
      <div id="box-wrapper">
        <h6 id="stat-title">{name}</h6>
        <div id="box">
          <button className="stat-button" id={`${selected}`} onClick={handleClick}>
            <h1 id="text">{value}</h1>
          </button>
        </div>
      </div>
    </>
  )
}