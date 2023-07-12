const { query } = require("../../services/influx_queries");
const { insertDataInflux, queryData } = require("./influxHelpers");
require("dotenv").config();

function storeWeatherData(weatherData) {
  try {
    const {
      city,
      icon,
      description,
      temperature,
      pressure,
      humidity,
      speed,
      feels_like,
      temp_min,
      temp_max,
    } = weatherData;
    const data = {
      measurement: "weather",
      fields: {
        temperature: temperature,
        humidity: humidity,
        description: description,
        pressure: pressure,
        speed: speed,
        feels_like: feels_like,
        temp_min: temp_min,
        temp_max: temp_max,
        icon: icon,
      },
      tags: {
        city: city,
      },
      timestamp: new Date(),
    };

    insertDataInflux(data);
  } catch (error) {
    console.log(error);
  }
}

// Query the latest weather data
async function queryLatestWeatherData() {
  try {
    return await queryData(query);
  } catch (error) {
    console.error("Error querying latest weather data:", error);
  }
}

module.exports = {
  storeWeatherData,
  queryLatestWeatherData,
};
