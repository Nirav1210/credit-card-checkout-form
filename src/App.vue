<template>
  <div class="centered-container">
    <card-details></card-details>
  </div>
</template>

<script>
import Vue from "vue";
import Card from './components/Card.vue';

export default {
  name: "App",
  components: {
    cardDetails: Card
  }
};

</script>

<style lang="scss">

</style>