const { default: axios } = require("axios");
const { publishWeatherData } = require("./utils/mqttConnection");

const fetchWeatherAndPublish = async (url, topic) => {
  try {
    const response = await axios.get(url);
    const data = response.data;

    const { name: city } = data;
    const { icon, description } = data.weather[0];
    const {
      temp: temperature,
      humidity,
      pressure,
      feels_like,
      temp_min,
      temp_max,
    } = data.main;
    const { speed } = data.wind;

    const weatherData = {
      city,
      temperature,
      humidity,
      speed,
      description,
      pressure,
      feels_like,
      temp_min,
      temp_max,
      icon,
    };
    // Publish weather data to a specific topic
    publishWeatherData(topic, weatherData);
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
};

module.exports = fetchWeatherAndPublish;
