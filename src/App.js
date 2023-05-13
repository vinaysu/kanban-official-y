import React from 'react'
import Home from './components/home/Home'
import { Route, Routes} from 'react-router-dom'
import Description from './components/description/Description'

function App() {
  return (
    <div>
        {/* <Home /> */}
      
        <Routes>
           <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Description />} />
        
        
      </Routes>


    </div>

    
  )
}

export default App