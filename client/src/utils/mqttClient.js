import mqtt from "mqtt/dist/mqtt";
import {mqttOptions} from "../config";
// MQTT broker connection options
const brokerOptions = {
  host: mqttOptions.host,
  port: mqttOptions.port,
  password: mqttOptions.password,
  clientId: mqttOptions.clientId,
  username: "shoaib",
  ssl: mqttOptions.ssl,
};

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
  const address = `${brokerOptions.ssl ? "ws" : "ws"}://${
    brokerOptions.host
  }:${brokerOptions.port}`;
  console.log(`Connecting to MQTT broker on ${address}`);
  client = mqtt.connect(address, brokerOptions);

  client.on("connect", () => {
    console.log("Connection succeeded!");
  });

  client.on("error", (error) => {
    console.log("Connection failed!", error);
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

export {
  connectMqttClient,
  disconnectMqttClient,
  subscribeTopic,
  client,
};
