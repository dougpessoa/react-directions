# :round_pushpin: React Directions
ReactJS - Google Maps - React Hooks

## :eyes: Overview

The React Directions is a simple application that brings how to get latitude and longitude of two places and searches directions.

See demo [here](https://react-directions.herokuapp.com/)
Or see on Gitpod [here](https://gitpod.io/#https://github.com/dougpessoa/react-directions)

## :question: And what is the proposal?
Study, only. This application shows my evolution on front-end development. :heartpulse:

## :pencil2: How it works?
When starts the application require your API Google Maps key. Don't worry, I'll not save anywhere your key. 
So will check if is valid. If don't the application not allow to continue. If valid let's continue.
After put address where you from and your destination where you want to go. Click "get directions". 
You will be redirect to another page. Now this page will show you your directions.
You can edit adresses and reverse start point and end point. 
Enjoy it! :blush:

## :no_entry_sign: How the application does not save my API Google Maps key? 
It's simple! When you type your key the application keeps in variable and it passing through pages. If you update the page will lost key then will request again.

### :paperclip: Dependencies 
 - [Axios](https://github.com/axios/axios) - Get latitude and longitude of some place from api GeoCode - Google Maps
 - [React Google Maps](https://github.com/tomchentw/react-google-maps) - Render the map and directions
 - [Geolib](https://github.com/manuelbieh/geolib) - Calculate the distance approximate between two places (using latitude and longitude).

 ---
 ### :page_with_curl: License

 This project is under license MIT
