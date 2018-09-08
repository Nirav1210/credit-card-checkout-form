<template>
  <div class="form">
      <md-field :md-counter="false">
        <label>Card Number</label>
        <md-input v-model="card.number" maxlength="16" autofocus></md-input>
      </md-field>

      <md-field>
        <label>Cardholder Name</label>
        <md-input v-model="card.name"></md-input>
      </md-field>

      <div class="card-type-container">
          <img :src="getImgUrl(card.type)" alt="card type">
      </div>

      <md-field>
        <label>Expiration</label>
        <md-input v-model="card.expiry"></md-input>
      </md-field>

      <md-field :md-toggle-password="false" :md-counter="false">
        <label>CVV</label>
        <md-input v-model="card.cvv" maxlength="3" type="password"></md-input>
      </md-field>

      <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
      </div>
  </div>
</template>

<script>
export default {
  name: "card-details",
  data() {
    return {
      card: {
        name: "",
        number: "",
        type: "visa",
        expiry: "",
        cvv: ""
      },
      isError: false,
    };
  },
  methods: {
    getImgUrl(src) {
        var images = require.context('../assets/', false, /\.png$/)
        return images('./' + src + ".png")
    },
    auth() {
      console.log('card name ',this.card.name);
      console.log('card number ',this.card.number);
      console.log('card type ',this.card.type);
      console.log('card expiry ',this.card.expiry);
      console.log('card cvv ',this.card.name);
    }
  },
  watch: {
    errors() {
      this.isError = this.errors.length > 0 ? true : false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.actions {
  .md-button {
    margin: 0;
  }
}
.form {
  margin-bottom: 60px;
}
.card-type-container {
  width: 100px;
}

</style>
