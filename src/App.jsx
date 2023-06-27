// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home'
import { Routes,Route } from 'react-router'
import { Link } from 'react-router-dom'
import Nex from './Nex'

function App() {

  return (
    <>
    {/* Welcome */}
    <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/next/:id' element={<Nex/>}/>
    </Routes>
      {/* <Home/> */}
    </>
  )
}

export default App
