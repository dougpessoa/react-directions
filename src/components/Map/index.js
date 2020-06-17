/* global google */
import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  DirectionsRenderer,
} from "react-google-maps";

function MapDirectionsRenderer({ places, travelMode }){
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const waypoints = places.map(place => ({
      location: { lat: place.latitude, lng: place.longitude },
      stopover: true
    }));

    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints
      },
      (result, status) => {
        if(status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError(result);
        }
      }
    );
  }, [places, travelMode]);

  return (
    error ? 
    <h1>{ error }</h1>
    :
    <DirectionsRenderer directions={directions} />
  );
}

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap 
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      <MapDirectionsRenderer
        places={props.markers}
        travelMode={google.maps.TravelMode.DRIVING}
      />
    </GoogleMap>
  ))
);

export default Map;