<template>
  <div class="item-container">
        <md-card>
            <md-card-media>
                <div class="image-container">
                    <img v-bind:src="getImgUrl(item.image_src)" alt="watch">
                </div>
            </md-card-media>

            <md-card-content>
                <div class="name-container">
                    <p>{{ item.name }}</p>
                </div>
                <div class="price-container">
                    <p> {{ item.price }}</p>
                </div>
            </md-card-content>
                
        </md-card>
  </div>
</template>

<script>
export default {
  name: "item-details",
  data() {
    return {
      item: {
        name: "rolex watch",
        price: "$1000",
        image_src: "women-bag"
      }
    };
  },
  methods: {
    getImgUrl(src) {
        var images = require.context('../assets/', false, /\.png$/)
        return images('./' + src + ".png")
    }
  }
};
</script>

<style lang="scss">
.item-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .image-container {
    background-color: lightcoral;
    top: 0;
  }
}
</style>