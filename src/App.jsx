import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Spinthewheel from './Components/Spinthewheel/Spinthewheel'
import Quiz from './Components/Quiz/Quiz'
import Navbar from './Components/Navbar/Navbar'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        
        <Routes>
          <Route path="/" element={
            <>
              <Spinthewheel />
            
            </>
          } />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App