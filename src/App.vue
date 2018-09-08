<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <item-details></item-details>
      <card-details></card-details>
    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import Vue from "vue";
import Card from './components/Card.vue';
import Item from './components/Item.vue';

export default {
  name: "App",
  components: {
    cardDetails: Card,
    itemDetails: Item
  }
};

</script>

<style lang="scss">
.centered-container {
  align-items: center;
  justify-content: center;
  position: relative;
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .background {
    background: url();
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
}
</style>