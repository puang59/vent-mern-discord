import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState, useEffect } from 'react'
import './App.css'
//import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Pages/Home"
import Vent from "./Pages/Vent"
import Write from "./Pages/Write"
import Error from "./Pages/Error"

function App() {

  return (
    <div className="App"> 
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/vents" element={<Vent />}></Route>
          <Route path="/write-vent" element={<Write />}></Route>

          <Route path="*" element={<Error />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
