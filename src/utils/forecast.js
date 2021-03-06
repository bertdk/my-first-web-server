const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3c62ae86f5bddca030bf10fc24fddca4&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " It is currently " +
          body.current.temperature +
          " degress out. It feels like " +
          body.current.feelslike +
          " degree and the clouds cover " +
          body.current.cloudcover +
          "%."
      );
    }
  });
};

module.exports = forecast;
