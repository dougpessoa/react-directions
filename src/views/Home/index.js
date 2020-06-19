import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { getDistance } from 'geolib';

import geocodeMapsApi from '../../services/geoCodeApi';

import KeyRequester from '../../components/KeyRequester';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import loading from '../../assets/images/loading.png';

// import './styles.css';
import {
  Container,
  Content,
  PlaceBtn,
  HomeEndBody,
  Loading
} from './styles';

export default function Home() {
  const { data } = useLocation();
  const history = useHistory();
  const [keyRequester, setKeyRequester] = useState(data === undefined ? true : false);
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState( data === undefined ? '' : data);

  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const settingValidKey = e => {
    setKey(e);
    setKeyRequester(false);
  }

  async function getDirections(){
    if(!start || !destination){
      setError(true);
      setErrorMessage('Please, to continue type your origin and your destination');
      return
    }

    setIsLoading(true);

    const startResponse = await geocodeMapsApi.get(`/json?address=${start}&key=${key}`);

    console.log(startResponse);

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

    console.log(destinationResponse);

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

    setError(false);

    const data = [{
      key: key,
      places: [{
        location: start,
        latitude: startLatitude,
        longitude: startLongitude
      },
      {
        location: destination,
        latitude: destinationLatitude,
        longitude: destinationLongitude
      }]
    }];

    return history.push({
      pathname: '/directions',
      data: data,
    });
  }

  return (
    <>
      {keyRequester && <KeyRequester validKey={settingValidKey} /> }
      <Container>
        <Content>
          <Header />
          <div className="place-in-out">
            <div className="formGroup">
              <label>Where are you?</label>
              <input type="text" onChange={(e) => setStart(e.target.value)} placeholder="Type here your origin"/>
            </div>
            <div className="formGroup">
              <label>Where you want to go?</label>
              <input type="text" onChange={(e) => setDestination(e.target.value)} placeholder="Type here your destination"/>
            </div>
          </div>
          <PlaceBtn>
            <button onClick={getDirections}>
                Get directions
                {isLoading && <Loading src={loading} alt="Loading"/> }
            </button>
            { error && <span>{errorMessage}</span> }
          </PlaceBtn>
          <HomeEndBody>
            <Footer />
          </HomeEndBody>
        </Content>
      </Container> 
    </>
  );
}

