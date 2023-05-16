import React from 'react';
import { useState, useEffect } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

const Vent = () => {
  const [listofvent, setlistofvent] = useState([])
  
  useEffect(() => {
    Axios.get('http://localhost:3001/getdata').then((response) => {
      const reversedData = response.data.reverse();
      setlistofvent(reversedData);
    }) 
  }, [])
  
  return(
    <div className="main-body">
      <h1>Vent Board</h1>
      <br></br>
      <Link to="/" className="btn btn-outline-secondary">Back</Link>
      <br></br><br></br>
      {listofvent.map((vent) => {
        return(
          <div>
            <div className="card">
              <h5 className="card-header">{vent.username}</h5>
              <div className="card-body">
                <h6 className="card-title">ID: {vent._id}</h6>
                <hr></hr>
                <h5 className="card-text">{vent.para}</h5>
                <a href={vent.jump} className="btn btn-primary">Jump Link</a>
              </div>
            </div>
            <br></br>
          </div>
        )
      })}    
    </div>
  )
}

export default Vent; 
