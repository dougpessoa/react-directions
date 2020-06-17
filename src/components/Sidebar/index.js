import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getDistance } from 'geolib';

import geocodeMapsApi from '../../services/geoCodeApi';

import Footer from '../Footer';

import './styles.css';

import goBack from '../../assets/images/go-back.png';
import backForth from '../../assets/images/back_forth.png';

import loading from '../../assets/images/loading.png';

export default function Sidebar({ places, googleKey, newDirections }) {

  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(true);
  const [key, setKey] = useState('');
  
  useEffect(() => {
    
    if(places.length !== 0) {
      setStart(places[0].location);
      setDestination(places[1].location);
    }

    if(googleKey.length !== 0){
      setKey(googleKey);
    }
  }, [places, googleKey]);


  async function reverse(){
    const toDestination = start;
    const toStart = destination;

    setDestination(toDestination);
    setStart(toStart);

    getNewDirections(true);
  }

  async function getNewDirections(reverse = false){
    if(!start || !destination){
      setError(true);
      setErrorMessage('Please, to continue type your origin and your destination');
      return
    }

    setIsLoading(true);

    const startResponse = await geocodeMapsApi.get(`/json?address=${start}&key=${key}`);

    if(startResponse.data.status !== "OK"){
      setError(true);
      setErrorMessage(
        startResponse.data.status === "ZERO_RESULTS" ?
        'The place you’re coming from is non-existent.'
        : "Some error happened unexpectedly, try again"
      );
      setIsLoading(false);
      return;
    }

    const startLatitude = startResponse.data.results[0].geometry.location.lat;
    const startLongitude = startResponse.data.results[0].geometry.location.lng;


    const destinationResponse = await geocodeMapsApi.get(`/json?address=${destination}&key=${key}`);

    if(destinationResponse.data.status !== "OK"){
      setError(true);
      setErrorMessage(
        destinationResponse.data.status === "ZERO_RESULTS" ?
        'The place you are wanting to go to is non-existent'
        : "Some error happened unexpectedly, try again"
      );
      setIsLoading(false);
      return;
    }

    const destinationLatitude = destinationResponse.data.results[0].geometry.location.lat;
    const destinationLongitude = destinationResponse.data.results[0].geometry.location.lng;

    const distance = getDistance(
      { latitude: startLatitude, longitude: startLongitude },
      { latitude: destinationLatitude, longitude: destinationLongitude }
    );

    if((distance / 1000) > 5000){
      setError(true);
      setErrorMessage(`The distance between "${start}" and "${destination}" is greater than the limit for this system.`);
      setIsLoading(false);
      return;
    }
   
    const directions = {
      places: [{
        location: reverse ? destination : start,
        latitude: reverse ? destinationLatitude : startLatitude,
        longitude: reverse ? destinationLongitude : startLongitude
      },
      {
        location: reverse ? start : destination,
        latitude: reverse ? startLatitude : destinationLatitude,
        longitude: reverse ? startLongitude : destinationLongitude
      }]
    };

    setIsLoading(false);
    await newDirections(directions);
  }

  return (
    <>
      <div className="sidebar">
        <div className="go-back">
          <Link to={{
            pathname: '/',
            data: key
          }}>
            <img src={goBack} alt="Go back arrow"/>
          </Link>
        </div>
        <div className="form-directions">
          <div className="points" >
            <span>A</span>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <span>B</span>
          </div>
          <div className="inputs">
            <input 
              type="text" 
              className="directions-inputs" 
              placeholder="Choose starting point"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />

            <input 
              type="text" 
              className="directions-inputs" 
              placeholder="Choose destination..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="change-directions">
            <img src={backForth} onClick={reverse} title="Reverse starting point and destination" alt="Back and Forth"/>
          </div>
        </div>
        <div className="get-directions">
          <button onClick={getNewDirections}>
            Get new directions
            {isLoading ? <img src={loading} alt="Loading" className="isLoading"/> : "" }
          </button>
          { error && <span>{errorMessage}</span> }
        </div>

        <div className="directionsEndOfBody">
          <Footer />
        </div>
      </div>
    </>
  );
}
