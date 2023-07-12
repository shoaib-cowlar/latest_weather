<template>
  <div>
    <app-navbar />

    <div class="mx-auto p-4 relative h-screen flex items-center justify-center">
      <div
        class="absolute inset-0 bg-weather bg-no-repeat bg-cover opacity-80"
      ></div>
      <div class="flex flex-wrap">
        <div class="w-full px-2">
          <div class="hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
            <div
              class="relative transition text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-900 to-black opacity-20"
              ></div>
              <div class="px-6 py-6 relative">
                <div class="flex mb-4 justify-between items-center">
                  <div>
                    <h5 class="mb-0 font-bold text-2xl mb-3">{{ city }}</h5>
                    <h6 class="mb-0">{{ date }}</h6>
                    <small>{{ description }}</small>
                  </div>
                  <div class="text-right">
                    <h3 class="font-bold text-4xl my-2">
                      <span>{{ temperature }}&deg;</span>
                    </h3>
                  </div>
                </div>
                <div
                  class="block sm:flex justify-between items-center flex-wrap"
                >
                  <div class="w-full sm:w-1/2">
                    <div class="flex mb-2 justify-between items-center">
                      <span>Feels like</span
                      ><small class="px-2 inline-block">{{ feels_like }}</small>
                    </div>
                  </div>
                  <div class="w-full sm:w-1/2">
                    <div class="flex mb-2 justify-between items-center">
                      <span>Pressure</span
                      ><small class="px-2 inline-block">{{ pressure }}</small>
                    </div>
                  </div>
                  <div class="w-full sm:w-1/2">
                    <div class="flex mb-2 justify-between items-center">
                      <span>Speed</span
                      ><small class="px-2 inline-block">{{ speed }}</small>
                    </div>
                  </div>
                  <div class="w-full sm:w-1/2">
                    <div class="flex mb-2 justify-between items-center">
                      <span>Temperature min</span
                      ><small class="px-2 inline-block"
                        >{{ temp_min }}&nbsp;&deg;</small
                      >
                    </div>
                  </div>
                  <div class="w-full sm:w-1/2">
                    <div class="flex mb-2 justify-between items-center">
                      <span>Temperature max</span
                      ><small class="px-2 inline-block"
                        >{{ temp_max }}&nbsp;&deg;</small
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="divider table mx-2 text-center bg-transparent whitespace-nowrap"
              >
                <span class="inline-block px-3"><small>Forecast</small></span>
              </div>
              <div class="px-6 py-6 relative">
                <div
                  class="text-center justify-between items-center flex"
                  style="flex-flow: initial"
                >
                  <div
                    class="text-center mb-0 flex items-center justify-center flex-col"
                  >
                    <span class="block my-1">Sun</span
                    ><img
                      src="https://i.imgur.com/ffgW9JQ.png"
                      class="block w-8 h-8"
                    /><span class="block my-1">38.3&deg;</span>
                  </div>
                  <div
                    class="text-center mb-0 flex items-center justify-center flex-col"
                  >
                    <span class="block my-1">Mon</span
                    ><img
                      src="https://i.imgur.com/BQbzoKt.png"
                      class="block w-8 h-8"
                    /><span class="block my-1">39.9&deg;</span>
                  </div>
                  <div
                    class="text-center mb-0 flex items-center justify-center flex-col"
                  >
                    <span class="block my-1">Mon</span
                    ><img
                      src="https://i.imgur.com/BQbzoKt.png"
                      class="block w-8 h-8"
                    /><span class="block my-1">40.1&deg;</span>
                  </div>
                  <div
                    class="text-center mb-0 flex items-center justify-center flex-col"
                  >
                    <span class="block my-1">Mon</span
                    ><img
                      src="https://i.imgur.com/ffgW9JQ.png"
                      class="block w-8 h-8"
                    /><span class="block my-1">41.5&deg;</span>
                  </div>
                  <div
                    class="text-center mb-0 flex items-center justify-center flex-col"
                  >
                    <span class="block my-1">Mon</span
                    ><img
                      src="https://i.imgur.com/ffgW9JQ.png"
                      class="block w-8 h-8"
                    /><span class="block my-1">40.1&deg;</span>
                  </div>
                  <div
                    class="text-center mb-0 flex items-center justify-center flex-col"
                  >
                    <span class="block my-1">Mon</span
                    ><img
                      src="https://i.imgur.com/BQbzoKt.png"
                      class="block w-8 h-8"
                    /><span class="block my-1">38&deg;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { client } from "../utils/mqttClient";
import { getWeather } from "../services/weatherService";
import { useRoute } from "vue-router";
import AppNavbar from "../components/layouts/AppNavbar.vue";
// import { image } from "../config";

const city = ref("");
const router = useRoute();
// const weatherMain = ref("");
const temperature = ref("");
const pressure = ref("");
const humidity = ref("");
const speed = ref("");
const description = ref("");
const temp_max = ref("");
const temp_min = ref("");
const feels_like = ref("");
// const imageSrc = ref(image.url);
const date = ref("");

function setData(data) {
  city.value = data.city;
  temperature.value = data.temperature;
  humidity.value = data.humidity;
  pressure.value = data.pressure;
  speed.value = data.speed;
  description.value = data.description;
  feels_like.value = data.feels_like;
  temp_min.value = data.temp_min;
  temp_max.value = data.temp_max;
}

async function getData() {
  try {
    const response = await getWeather();
    const {
      city,
      temperature,
      speed,
      humidity,
      description,
      pressure,
      feels_like,
      temp_min,
      temp_max,
    } = response.data;
    setData({
      city,
      temperature,
      speed,
      humidity,
      description,
      pressure,
      feels_like,
      temp_min,
      temp_max,
    });
  } catch (err) {
    alert(err.response.data);
    alert("Redirecting to Login Page");
    router.push("/login");
  }
}

onMounted(() => {
  date.value = new Date().toUTCString().slice(5, 16);
  getData();

  client.on("message", (topic, message) => {
    console.log(topic);
    const {
      city,
      temperature,
      speed,
      humidity,
      pressure,
      description,
      feels_like,
      temp_min,
      temp_max,
    } = JSON.parse(message.toString());

    setData({
      city,
      temperature,
      speed,
      humidity,
      description,
      pressure,
      feels_like,
      temp_min,
      temp_max,
    });
    console.log(JSON.parse(message.toString()));
  });
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .flex {
  display: flex;
  align-items: center;
}

.card {
  background-color: #000;
  color: #fff;
  padding: 2em;
  width: 100%;
  max-width: 420px;
  margin: 1em;
  border-radius: 30px;
}

.search {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar {
  padding: 0.7em 1em;
  background-color: #222;
  outline: none;
  border: none;
  border-radius: 24px;
  font-size: 105%;
  color: #fff;
  width: calc(100% - 100px);
}

button {
  color: white;
  margin: 0.5em;
  border-radius: 50%;
  height: 44px;
  width: 44px;
  border: none;
  background-color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
}

button:hover {
  background: #7c7c7c6b;
}

h1.temp {
  margin: 0;
  margin-bottom: 0.4em;
} */
</style>
