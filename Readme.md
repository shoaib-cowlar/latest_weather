# Weather App



The Weather App is a web application built with the PEVN stack (PostgreSQL, Express.js, Vue.js, Node.js). It utilizes InfluxDB for storing weather data and MQTT for fetching data from devices.

By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation using Joi, continuous integration, docker support, etc. For more details, check the features list below.

## Features

- Real-time weather data fetching from MQTT devices
- Storage of weather data in InfluxDB
- Web-based user interface for viewing weather information


## Prerequisites

Make sure you have the following dependencies installed on your machine:

- Docker
- Docker Compose


## Quick Start


Clone the repo:

```bash
git clone https://github.com/shoaib-cowlar/latest_weather

```

Navigate to the project directory:

Install the dependencies:

Make a folder name "env" for storing environment variables

Copy/Paste these Client and server envs

server.env : 
```
WEATHER_API = https://api.openweathermap.org/data/2.5/weather?q=islamabad&units=metric&appid=69259004c2ebac362b71a19cefe024b6

# Server default port
PORT = 5000

JWT_SECRET = jwtsecretcode

# Influx db credentials
INFLUX_TOKEN = 9cqw4XcMS0tACKVl8zoYQFsl4PtyxbuzxXmYtqi7TYaivKwcWCjlJ90qFHN4ejV05dhkptSJ1C5mKBVG9fkZlA==
INFLUX_URL = 'http://influxdb:8086'
INFLUX_ORG = 'cowlar'
INFLUX_BUCKET = 'weather'

# Mqtt credentials
MQTT_USER = 'shoaib'
MQTT_PASS = 'password'
MQTT_HOST = 'mqtt5'
MQTT_PORT = 1883
MQTT_SSL = false

# Postgres database

DEV_DB_USER = 'shoaib'
DEV_DB_PASS = '1234'
DEV_DB_DB = 'weather'
# DEV_DB_HOST = '192.168.104.41' 
DEV_DB_DIALECT = 'postgres'


TEST_DB_USER = 'shoaib'
TEST_DB_PASS = '1234'
TEST_DB_DB = 'test'
# TEST_DB_HOST = 'localhost'
TEST_DB_DIALECT = 'postgres'

```
And client.env :

```
# MQTT credentials
VUE_APP_MQTT_HOST = 'localhost'
VUE_APP_MQTT_PORT = 9001
VUE_APP_MQTT_USER = 'shoaib'
VUE_APP_MQTT_PASS = 'password'
VUE_APP_MQTT_SSL = true
VUE_APP_MQTT_TOPIC = "weather/updates"

# Backend url
VUE_APP_BASE_URL = 'http://localhost:5000'

VUE_APP_IMAGE_URL = 'https://openweathermap.org/img/wn/04n.png'

```

Start the application using Docker Compose:
```
docker-compose up --build

```
Wait for the containers to start and the application to be accessible.

Open your browser and visit http://localhost:3001 to access the Weather App.



## Project Structure

```
src\
 |--config\             # Environment variables and configuration related things
 |--controllers\        # Route controllers (controller layer)
 |--middlewares\        # Custom express middlewares
 |--models\             # Mongoose models (data layer)
 |--routes\             # Routes
 |--services\           # Business logic (service layer)
 |--utils\              # Utility classes and functions
 |--server.js           # App entry point
 |--weatherStation.js   # Publishing Weather Data
```


## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

