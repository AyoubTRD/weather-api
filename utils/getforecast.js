const request = require("request");

const keys = {
  weather: "d0e4d85238bb62e354a0c2f09e3b953a",
  geoCoding:
    "pk.eyJ1IjoiYXlvdWJ0cmQiLCJhIjoiY2sxNHpzdWl4MDg5dTNncXVnbGp2ZXp3NiJ9._GDyTXl3xnPBg8PBO7FAoA"
};

const getGeoUrl = query => {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?access_token=${keys.geoCoding}`;
};

const getGeoInfo = (query, cb) => {
  const url = getGeoUrl(query);
  request({ url, json: true }, (err, res) => {
    if (err) {
      return cb(null, null, err);
    } else {
      const result = res.body.features[0];
      const coords = result.geometry.coordinates;
      const place = result.place_name;
      return cb(coords, place);
    }
  });
};

const getWeatherUrl = (query, cb) => {
  getGeoInfo(query, (coords, place, err) => {
    if (err) {
      return cb(null, null, err);
    }
    const url = `https://api.darksky.net/forecast/${keys.weather}/${
      coords[1]
    },${coords[0]}?units=si`;
    return cb(url, place);
  });
};

const getWeatherInfo = (query, cb) => {
  getWeatherUrl(query, (url, place, err) => {
    if (err) {
      cb(err);
    }
    request({ url, json: true }, (err, res) => {
      const data = res.body;
      if (err) {
        return cb(err, data, place);
      }
      return cb(err, data, place);
    });
  });
};

module.exports = getWeatherInfo;
