require("dotenv").config();

//PORT
const port = process.env.TEST_PORT || process.env.PORT || 5000;

// JWT credentials
const jwtCredentials = {
  jwtSecret: process.env.JWT_SECRET,
};

//InfluxDb.config
const influx = {
  url: process.env.INFLUX_URL,
  token: process.env.INFLUX_TOKEN,
  org: process.env.INFLUX_ORG,
  bucket: process.env.INFLUX_BUCKET,
};

// MQTT CredentialsProvider
const mqttOptions = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
    clientId: "emqx_nodejs_" + Math.random().toString(16).substring(2, 8),
    ssl: process.env.MQTT_SSL,
  };

module.exports = { influx, jwtCredentials, port, mqttOptions }; 
