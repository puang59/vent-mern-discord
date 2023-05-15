import React from 'react';
import {Link} from 'react-router-dom'
const Home = () => {
  return(
    <div className="main-body">
      <h1>Vent - Stay Anonymous</h1>
      <hr></hr>
      <div className="button-container">
        <Link to="/vents" className="btn btn-secondary">Vent Board</Link>
        <Link to="/write-vent" className="btn btn-secondary">Write Vent</Link>
      </div>
    </div>
  )
}

export default Home; 
