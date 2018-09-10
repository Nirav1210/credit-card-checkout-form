<template>
  <div class="form-container">
    <!--<div v-for="error in errors" :key="error">
      <b-alert variant="danger" :show="isError">{{ error }}</b-alert>
    </div>-->
    <b-form @submit="onSubmit" name="creditCardForm">
      <div class="left-container">
        <b-form-group label="CARD NUMBER" :invalid-feedback="errors.cardNumber" :state="errors.cardNumber.length > 0 ? false : null">
          <b-row>
            <b-col v-for="(item, index) in numberSets" :key="index">
              <b-form-input class="inputs" type="text" maxlength="4"
                            :id="`${index}`"
                            v-model="numberSets[index]"
                            v-numericOnly
                            v-autoTab
                            required
                            placeholder="0000"
                            :state="errors.cardNumber.length > 0 ? false : null">
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
            <b-form-group label="MONTH" :invalid-feedback="errors.expiryMonth" :state="errors.expiryMonth.length > 0 ? false : null">
              <b-form-input type="text"
                            id="expiryMonth"
                            v-numericOnly maxlength="2"
                            v-model="card.expiry.month"
                            v-autoTab
                            required
                            :state="errors.expiryMonth.length > 0 ? false : null"
                            placeholder="00">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
          <b-form-group label="YEAR" :invalid-feedback="errors.expiryYear" :state="errors.expiryYear.length > 0 ? false : null">
            <b-form-input type="text"
                          id="expiryYear"
                          v-numericOnly maxlength="4"
                          v-model="card.expiry.year"
                          v-autoTab
                          required
                          :state="errors.expiryYear.length > 0 ? false : null"
                          placeholder="0000">
            </b-form-input>
          </b-form-group>
          </b-col>
          <b-col>
          </b-col>
          <b-col>
            <b-form-group label="CVC" :invalid-feedback="errors.cardCVC" :state="errors.cardCVC.length > 0 ? false : null">
              <b-form-input type="text"
                            id="cvc"
                            v-numericOnly maxlength="3"
                            v-model="card.cvc"
                            v-autoTab
                            required
                            :state="errors.cardCVC.length > 0 ? false : null"
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
        <b-row class="row-footer">
          <b-col class="col-amount">
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
        numberSets: ["", "", "", ""],
        errorInfo: "no-error",
        isError: false,
        errors: {
          cardNumber: "",
          expiryMonth: "",
          expiryYear: "",
          cardCVC: ""
        },
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
        console.log(this.errors);
      },
      validateForm(card) {
        const isValidNumber = Payment.fns.validateCardNumber(card.cardNumber);
        const isValidCardType = this.cardTypes.includes(Payment.fns.cardType(card.cardNumber));
        const isValidCVC = Payment.fns.validateCardCVC(card.cvc);
        const isValidExpiry = Payment.fns.validateCardExpiry(card.expiry.month, card.expiry.year);

        if(isValidCardType) {
          this.card.cardType = Payment.fns.cardType(card.cardNumber);
        }
        if(!isValidNumber) {
          this.errors.cardNumber = "Please correct your card number";
        }
        if(!isValidCVC) {
          this.errors.cardCVC = "CVC number is not valid";
        }
        if(!isValidExpiry) {
          this.errors.expiryMonth = "Please enter correct expiration month";
          this.errors.expiryYear = "Please enter correct expiration year";
        }
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
      },
      autoTab: {
        bind(el) {
          el.addEventListener('keyup', () => {
            if (el.value.length === el.maxLength) {
              focusNextElement();
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

  
  /**
   * To enable `auto tabbing` to next element
   * Reference : https://stackoverflow.com/a/35173443
   */
  function focusNextElement() {
    //add all elements we want to include in our selection
    var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement && document.activeElement.form) {
        var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
        function (element) {
            //check for visibility while always include the current activeElement 
            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
        });
        var index = focussable.indexOf(document.activeElement);
        if(index > -1) {
            var nextElement = focussable[index + 1] || focussable[0];
            nextElement.focus();
        }                    
    }
  }
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
      padding-left: 5%;
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
      .col-amount {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
      .row-footer{
        height: 50px;
      }
      .pay-button {
        width: 70%;
        height: 100%;
        font-size: 9pt;
        float: right;
        border: none;
        background-color: #d1ac6a;
        border-radius: 35px;
        box-shadow: 9px 9px 64px -25px rgba(0,0,0,0.75), inset 1px 1px 60px -20px rgba(253,253,253,0.75);;
        
      }
    }
  }
}
</style>