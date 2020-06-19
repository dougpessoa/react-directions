# :round_pushpin: React Directions
ReactJS - Google Maps - React Hooks

## :eyes: Overview

The React Directions is a simple application that shows how to get latitude and longitude of two places and searches directions.

See demo [here](https://react-directions.herokuapp.com/)
Or see on Gitpod [here](https://gitpod.io/#https://github.com/dougpessoa/react-directions)

## :question: And what is the proposal?
Study. This application shows my evolution on front-end development. :heartpulse:

## :pencil2: How it works?
The application when started will require your API Google Maps key. You don't have to worry. The app won’t save your key anywhere, but it will check if it is valid. Then you just have to inform your actual location and the destination where you want to go. Click "get directions". You will be redirected to another page, that will show you your directions. You also can reverse start point and end point. Enjoy it! :blush:

## :no_entry_sign: How the application does not save my API Google Maps key? 
It's simple! When you type your key, the application will keep the information in a variable, something that passes through pages and keep your key safe. If you update the page, the key will be lost and the application will request it again.

### :paperclip: Dependencies 
 - [Axios](https://github.com/axios/axios) - Get latitude and longitude of some place from api GeoCode - Google Maps
 - [React Google Maps](https://github.com/tomchentw/react-google-maps) - Render the map and directions
 - [Geolib](https://github.com/manuelbieh/geolib) - Calculate the distance approximate between two places (using latitude and longitude).

 ---
 ### :page_with_curl: License

 This project is under license MIT
