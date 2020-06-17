import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';
import  './styles.css';

export default function Directions() {
  const history = useHistory();
  const { data } = useLocation();

  const [showMap, setShowMap] = useState(true);
  const [places, setPlaces] = useState(data === undefined ? [] : data[0].places);
  const [key] = useState(data === undefined ? '' : data[0].key);
  
  useEffect(() => {
    if(data === undefined) {
      return history.push('/');
    }
  }, [data, history]);

  function reloadMap(places){
    console.log('places:?', places);
    setShowMap(false);
    setPlaces(places);
    setShowMap(true);
  }

  return (
    <div className="page-directions">
      <Sidebar 
        places={places} 
        googleKey={key} 
        newDirections={(e) => reloadMap(e.places)}
      />

      {showMap && 
      <Map 
        googleMapURL={
          'https://maps.googleapis.com/maps/api/js?key=' +
          key +
          '&libraries=geometry,drawing,places'
        }
        markers={places}
        loadingElement={<div style={{height: `100vh`, width: '100%'}}/>}
        containerElement={<div style={{height: `100vh`, width: '100%'}}/>}
        mapElement={<div style={{height: `100vh`, width: '100%'}}/>}
        defaultCenter={{lat: -22.951867, lng: -43.210412}}
        defaultZoom={11}
      /> }
    </div>
  );
}
