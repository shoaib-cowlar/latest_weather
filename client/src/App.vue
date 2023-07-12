<template>
  <router-view></router-view>
</template>

<script>
import { connectMqttClient, subscribeTopic } from "./utils/mqttClient";
import { mqttOptions } from "./config";

export default {
  name: "App",
  mounted() {
    connectMqttClient();
    subscribeTopic(mqttOptions.topic, 0);
  },
};
</script>

<style>
section {
  min-height: 108vh !important;
}
</style>
