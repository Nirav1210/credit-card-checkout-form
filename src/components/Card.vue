<template>
  <div class="form-container">
    <b-form @submit="onSubmit" name="creditCardForm">
      <div class="left-container">
        <b-form-group label="CARD NUMBER">
          <b-row>
            <b-col v-for="(item, index) in numberSets" :key="index">
              <b-form-input type="text" maxlength="4" placeholder="0000"
                            v-model="numberSets[index]"
                            v-numericOnly
                            required>
              </b-form-input>
            </b-col>
          </b-row>
        </b-form-group>
        <b-row>
          <b-col cols="4">
            <b-form-group class="card-firstname" label="FIRST NAME">
              <b-form-input type="text"
                            v-model="card.name.firstName"
                            required>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group class="card-lastname" label="LAST NAME">
              <b-form-input type="text"
                            v-model="card.name.lastName"
                            required>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="MONTH">
              <b-form-input type="text"
                            v-numericOnly maxlength="2"
                            v-model="card.expiry.month"
                            required
                            placeholder="00">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
          <b-form-group label="YEAR">
            <b-form-input type="text"
                          v-numericOnly maxlength="4"
                          v-model="card.expiry.year"
                          required
                          placeholder="0000">
            </b-form-input>
          </b-form-group>
          </b-col>
          <b-col>
          </b-col>
          <b-col>
            <b-form-group label="CVV">
              <b-form-input type="text"
                            v-numericOnly maxlength="4"
                            v-model="card.cvc"
                            required
                            placeholder="000">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <div class="right-container">
        <div class="card-type-container">
          <img :src="getImgUrl(card.cardType)" alt="card type">
        </div>
      </div>
      <div class="card-footer">
        <b-row>
          <b-col>
            <div><span class="thick">TOTAL: </span><span class="thick amount">{{ card.amount }}</span></div>
          </b-col>
          <b-col cols="4"></b-col>
          <b-col>
            <b-button class="pay-button" type="submit" variant="primary">PAY NOW</b-button>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </div>
</template>

<script>
import Payment from 'payment/lib';

let card = {
    amount: "$100",
    cardType: "mastercard",
    name: {
      firstName: "",
      lastName: ""
    },
    cardNumber: "",
    expiry: {
      month: "",
      year: ""
    },
    cvc: ""
  };

  export default {
    name: "card-details",
    data() {
      return {
        card,
        cardTypes: ['mastercard','visa'],
        numberSets: ["1234", "5678", "", ""],
        isError: false,
      };
    },
    methods: {
      getImgUrl(src) {
        var images = require.context('../assets/', false, /\.png$/)
        return images('./' + src + ".png")
      },
      onSubmit (evt) {
        evt.preventDefault();
        this.card.cardNumber = this.numberSets.join('');
        this.validateForm(this.card);
      },
      validateForm(card) {
        console.log('card info', card.amount);
        console.log('card info', card.name.firstName);
        console.log('card info', card.cardType);
        console.log('card info', card.cardNumber);
        console.log('card info', card.expiry.month);
        console.log('card info', card.cvc);

        const isValidNumber = Payment.fns.validateCardNumber(card.cardNumber);
        const isValidCVC = Payment.fns.validateCardCVC(card.cvc);
        const isValidExpiry = Payment.fns.validateCardExpiry(card.expiry.month, card.expiry.year);

        console.log('card valid number', isValidNumber);
        console.log('card valid date', isValidExpiry);
        console.log('card valid cvc', isValidCVC);
        
      }
    },
    directives: {
      numericOnly: {
        bind(el) {
          el.addEventListener('keyup', () => {
            let regex = /^[0-9]*$/
            if (!regex.test(el.value)) {
              el.value = el.value.slice(0, -1)
            }
          })
        }
      }
    },
    computed: {
      // a computed getter
      cardNumber: function () {
        // `this` points to the vm instance
        return this.card.numberSets.join('');
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
.form-container {
  padding: 10%;
  background-color: #e2d1c6;
  font-size: 10pt;
  font-family: Verdana, Geneva, sans-serif;
  form {
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    border-radius: 10px;
    padding: 5%;
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    .left-container {
      input {
        font-size: 0.7rem;
      }
      font-size: 0.7rem;
      flex: 1 0 65%;
      padding: 20px;
    }
    .right-container {
      padding: 5%;
      flex: 1;
      img {
        width: 70px;
      }
    }
    .card-footer {
      background-color: white;
      padding: 20px;
      display: block;
      width: 100%;
      span.thick {
        font-weight: bold;
      }
      span.amount {
        color: #d1ac6a;
      }
      .pay-button {
        width: 100%;
        height: 100%;
        font-size: 9pt;
        border: none;
        background-color: #d1ac6a;
        border-radius: 35px;
        box-shadow: 10px 10px -10px 0px rgba(0,0,0,0.75);
      }
    }
  }
}
</style>