import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Spinthewheel from './Components/Spinthewheel/Spinthewheel'
import Quiz from './Components/Quiz/Quiz'
import Mario from './Components/Mario/Mario'
import FlipCardGame from './Components/Cards/Cards'

function App() {
  return (
    <Router>
      <div className="App">     
        <Routes>
          <Route path="/" element={
            <>
              <Spinthewheel />
            
            </>
          } />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/mario" element={<Mario />} />
          <Route path="/cards" element={<FlipCardGame />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App