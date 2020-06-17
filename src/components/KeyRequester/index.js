import React, { useState } from 'react';

import geocodeMapsApi from '../../services/geoCodeApi';

import  './styles.css';

export default function KeyRequester({ validKey }) {
  const [key, setKey] = useState('');
  const [invalidKey, setInvalidKey] = useState(false);

  const redirectToGitHub = e => {
    window.open('https://facebook.com', "_blank");
  }

  async function check(){
    if(!key){
      return setInvalidKey(true);
    }

    const location = "Christ the Redeemer";
    const response = await geocodeMapsApi.get(`/json?address=${location}&key=${key}`);

    if(response.data.status === "REQUEST_DENIED"){
      return setInvalidKey(true);
    }
    
    validKey(key);
  }

  return (
    <>
      <div className="popup">
        <div className="required-box">
          <h3>Please, type your Google Maps Key</h3>
          
          <h4 
            style={{ 
              display: invalidKey ? "block" : "none"
            }}
          >
            Your key is invalid. <br />
            Click <span onClick={redirectToGitHub}>here</span> to find out how to get a correct key
          </h4>
          
          <input 
            type="text" 
            name="form-required-key" 
            placeholder="Your key here"
            onChange={(e) => setKey(e.target.value)}
          />

          <button onClick={check}>Check</button>
          <h6>
            To proceed it is necessary to put the key. <br/>
            Do not worry, this key will not be saved anywhere.
          </h6>
        </div>
      </div>
    </>
  );
}