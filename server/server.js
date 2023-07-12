const express = require("express");

const { connectDatabase } = require("./utils/database");
const topic = require("./utils/mqttTopics");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const privateRoutes = require("./routes/privateRoutes");

const fetchWeatherAndPublish = require("./weatherStation");
const { connectMqttClient, subscribeTopic } = require("./utils/mqttConnection");

const { port : PORT, weatherApi } = require("./config");
const cors = require("cors");


const app = express();

const port = PORT || 5000;

connectDatabase();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/weather", weatherRoutes);
// later use for authorization
app.use("/api/private", privateRoutes);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
  connectMqttClient();
  subscribeTopic(topic, 0);
  // Publish Weather at regular intervals (e.g., every 1 hour)
  setInterval(async () => {
    await fetchWeatherAndPublish(weatherApi, topic);
  }, 5000); // 5000 milliseconds = 5 seconds
});

module.exports = app;
