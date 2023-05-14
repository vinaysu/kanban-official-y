import React from 'react'
import Home from './components/home/Home'
import { Route, Routes } from 'react-router-dom'
import Description from './components/description/Description'
import Navbar from './components/navbar/Navbar'
import "./App.css"

function App() {
  return (
    <div className='App'>

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Description />} />


      </Routes>


    </div>


  )
}

export default App