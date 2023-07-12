const mqtt = require("mqtt");
const {
  storeWeatherData,
  queryLatestWeatherData,
} = require("../helpers/influxdb");
const { mqttOptions } = require("../config");
const mqttTopic = require("./mqttTopics");

// MQTT client instance
let client;

// Subscribe to a topic
const subscribeTopic = (topic, qos) => {
  client.subscribe(topic, { qos }, (error) => {
    if (error) {
      console.log("Subscribe to topic error:", error);
      return;
    }
    console.log("Subscribed to topic:", topic);
  });
};

// Connect to MQTT broker and handle events
const connectMqttClient = () => {
  const address = `${mqttOptions.ssl ? "mqtt" : "mqtt"}://${mqttOptions.host}:${
    mqttOptions.port
  }/${mqttOptions.endpoint}`;
  console.log(`Connecting to MQTT broker on ${address}`);
  client = mqtt.connect(address, mqttOptions);

  client.on("connect", () => {
    console.log("Connection succeeded!");
  });

  client.on("error", (error) => {
    console.log("Connection failed!", error);
  });

  client.on("message", async (topic, message) => {
    const weatherData = JSON.parse(message.toString());

    // Store the weatherData in the database
    if (topic === mqttTopic) {
      try {
        storeWeatherData(weatherData);
        console.log("data successfully stored in influxdb");

        await queryLatestWeatherData();
        console.log("Fetched weather data");
      } catch (error) {
        console.log("error while storing weather data to influxdb", error);
      }
    }
  });

  return client;
};

// Disconnect MQTT client
const disconnectMqttClient = () => {
  if (client) {
    client.end();
    console.log("Disconnected from MQTT broker");
  }
};

// Publish weather data to the MQTT broker
const publishWeatherData = (topic, data) => {
  if (client) {
    const payload = JSON.stringify(data);
    client.publish(topic, payload, { qos: 0 }, (error) => {
      if (error) {
        console.log("Failed to publish weather data:", error);
      } else {
        console.log("Weather data published successfully", payload);
      }
    });
  }
};

module.exports = {
  connectMqttClient,
  disconnectMqttClient,
  publishWeatherData,
  subscribeTopic,
};
