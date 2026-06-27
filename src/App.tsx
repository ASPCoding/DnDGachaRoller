import Stats from './components/Stats'
import StatSetter from './components/StatSetter'
import {useEffect} from 'react'
import AppStore from './stores/AppStore'

import './App.css'

function App() {
  useEffect(() => {
    if(AppStore.cookieString != ""){
      AppStore.retrieveData()
    }
  },[])

  return (
    <>
      <div>
        <h1>D&D Gacha Stat Roller</h1>
      </div>
      <div id="layout">
        <Stats/>
        <StatSetter/>
      </div>
    </>
  )
}

export default App
