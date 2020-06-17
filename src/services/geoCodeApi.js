import axios from 'axios';

const geocodeMapsApi = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode',
    timeout: 20000,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
});

export default geocodeMapsApi;