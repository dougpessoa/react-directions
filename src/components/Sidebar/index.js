import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getDistance } from 'geolib';

import geocodeMapsApi from '../../services/geoCodeApi';

import Footer from '../Footer';

import {
  Bar,
  GoBack,
  Form,
  Point,
  Inputs,
  ChangeDirections,
  GetDirections,
  DirectionsEndOfBody,
  Loading
} from './styles';

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
        'The origin place doesn’t exist.'
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
        "The destination doesn't exist"
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
      setErrorMessage(`The distance between "${start}" and "${destination}" is bigger than the limit supported by system.`);
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
      <Bar>
        <GoBack>
          <Link to={{
            pathname: '/',
            data: key
          }}>
            <img src={goBack} alt="Go back arrow"/>
          </Link>
        </GoBack>
        <Form>
          <Point>
            <span>A</span>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <span>B</span>
          </Point>
          <Inputs>
            <input 
              type="text"  
              placeholder="Type here your origin"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />

            <input 
              type="text" 
              placeholder="Type here your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Inputs>
          <ChangeDirections>
            <img src={backForth} onClick={reverse} title="Switch between destination and starting point" alt="Back and Forth"/>
          </ChangeDirections>
        </Form>
        <GetDirections>
          <button onClick={getNewDirections}>
            Get new directions
            {isLoading ? <Loading src={loading} alt="Loading"/> : "" }
          </button>
          { error && <span>{errorMessage}</span> }
        </GetDirections>
        <DirectionsEndOfBody>
          <Footer />
        </DirectionsEndOfBody>
      </Bar>
    </>
  );
}
