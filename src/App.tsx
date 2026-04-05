import { useState } from 'react'
import Stats from './components/Stats'
import StatSetter from './components/StatSetter'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
