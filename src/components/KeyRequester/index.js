import React, { useState } from 'react';

import geocodeMapsApi from '../../services/geoCodeApi';

// import  './styles.css';
import { Popup, Box } from './styles';

export default function KeyRequester({ validKey }) {
  const [key, setKey] = useState('');
  const [invalidKey, setInvalidKey] = useState(false);

  const redirectToGitHub = e => {
    window.open('https://developers.google.com/maps/documentation/javascript/get-api-key', "_blank");
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
      <Popup>
        <Box>
          <h3>Please, type your Google Maps Key</h3>
          <h4 
            style={{ 
              display: invalidKey ? "block" : "none"
            }}
          >
            Your key is invalid. <br /> 
            Click <span onClick={redirectToGitHub}>here</span> to get the correct key.
          </h4>
          <input 
            type="text" 
            name="form-required-key" 
            placeholder="Your key here"
            onChange={(e) => setKey(e.target.value)}
          />
          <button onClick={check}>Check</button>
          <h6>
            To proceed it is necessary to put your key. <br />
            Do not worry, the key will not be saved anywhere.
          </h6>
        </Box>
      </Popup>
    </>
  );
}