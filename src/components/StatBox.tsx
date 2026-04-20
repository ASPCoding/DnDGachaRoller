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
      console.log(AppStore.getSelectedNumber())
      console.log(String(AppStore.getSelectedStatNumber()))
      console.log(value)
      console.log(selected)
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

  useEffect(() => {
    AppStore.on("statSelected", updateSelected)
    AppStore.on("twoSelected", setStat)

    return () => {
      AppStore.off("statSelected", updateSelected)
      AppStore.off("twoSelected", setStat)
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