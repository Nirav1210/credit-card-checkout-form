<template>
  <div>
    <Card></Card>
  </div>
</template>

<script>
  import Vue from "vue";
  import Card from "./components/Card/Card.vue";

  export default {
    name: "App",
    components: {
      Card
    }
  };
</script>

<style lang="scss">
  body {
    overflow: hidden;
  }
</style>