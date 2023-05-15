import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Write = () => {
  const [username, setUsername] = useState('');
  const [para, setPara] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const postvent = () => {
    Axios.post('http://localhost:3001/postdata', {
      para,
      username,
    })
      .then(() => {
        setShowSuccessToast(true);
        setUsername(""); 
        setPara("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="main-body">
      <h1>Write Vent</h1>
      <br></br>
      <Link to="/" className="btn btn-outline-secondary">
        Back
      </Link>
      <br></br>
      <br></br>
      <hr></hr>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          @
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div className="input-container">
        <div className="input-group">
          <span className="input-group-text">Vent box</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            onChange={(event) => {
              setPara(event.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <br></br>
      <div className="d-grid gap-2">
        <button
          className="btn btn-success"
          type="button"
          onClick={postvent}
        >
          Post
        </button>
      </div>
      {showSuccessToast && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 11 }}
        >
          <div className="toast show" role="alert" aria-live="assertive">
            <div className="toast-header">
              <strong className="me-auto">Success!</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={() => setShowSuccessToast(false)}
              ></button>
            </div>
            <div className="toast-body">Your vent has been posted.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Write;
