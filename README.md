# To send a request to the apî and get the forecast for a specific location:
  send a get request to: "https://trd-weather-api.herokuapp.com/getforecast?q={location}"
  
### HOW IT WORKS: 

  The api gets a query which is the location and then sends that location to the <strong>mapbox</strong> api, which receives a location and sends the longtitude and the latitude for that location, which are going to be used to get the forecast from the <strong>darksky</strong> api.
