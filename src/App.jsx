import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Foodcard from './Components/Foodcard'

function App() {
  const [count,   setCount] = useState(0)

  return (
    <>
    <h1>Wlcome To FoodiesHub</h1>
     < Foodcard />
     < Navbar />
    </>
  )
}

export default App
