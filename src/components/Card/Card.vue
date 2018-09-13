<template>
  <div class="form-container">
    <b-alert variant="success" :show="isPaymentSuccess"> Payment Successful !!</b-alert>
    <b-form @submit.prevent="onSubmit" name="creditCardForm">
      <div class="left-container">
        <b-form-group label="CARD NUMBER" id="cardNumber" :invalid-feedback="errors.cardNumber" :state="getValidityState(errors.cardNumber)">
          <b-row>
            <b-col v-for="(item, index) in card.cardNumber" :key="index">
              <b-form-input :class="`inputs-${index}`" type="text" maxlength="4" :id="`${index}`" v-model="card.cardNumber[index]"
                v-numericOnly v-autoTab required placeholder="0000" :state="getValidityState(errors.cardNumber)">
              </b-form-input>
            </b-col>
          </b-row>
        </b-form-group>
        <b-row>
          <b-col cols="4">
            <b-form-group class="card-firstname" label="FIRST NAME" :invalid-feedback="errors.cardName" :state="getValidityState(errors.cardName)">
              <b-form-input type="text" maxlength="20" v-autoTab v-alphabetsOnly v-model="card.name.firstName" required
                :state="getValidityState(errors.cardName)">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group class="card-lastname" label="LAST NAME">
              <b-form-input type="text" maxlength="20" v-autoTab v-alphabetsOnly v-model="card.name.lastName" required
                :state="getValidityState(errors.cardName)">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="MONTH" :invalid-feedback="errors.expiryDate" :state="getValidityState(errors.expiryDate)">
              <b-form-input type="text" id="expiryMonth" v-numericOnly maxlength="2" v-model="card.expiry.month"
                v-autoTab required :state="getValidityState(errors.expiryDate)" placeholder="00">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="YEAR" :state="getValidityState(errors.expiryDate)">
              <b-form-input type="text" id="expiryYear" v-numericOnly maxlength="4" v-model="card.expiry.year"
                v-autoTab required :state="getValidityState(errors.expiryDate)" placeholder="0000">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
          </b-col>
          <b-col>
            <b-form-group label="CVC" :invalid-feedback="errors.cardCVC" :state="getValidityState(errors.cardCVC)">
              <b-form-input type="text" id="cvc" v-numericOnly maxlength="3" v-model="card.cvc" v-autoTab required
                :state="getValidityState(errors.cardCVC)" placeholder="000">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <div class="right-container">
        <div>
          <img :src="getImgUrl(cardType)" alt="card type">
        </div>
      </div>
      <div class="card-footer">
        <b-row>
          <b-col>
            <div class="total-amount-info"><span>TOTAL: </span><span class="amount">{{ card.amount }}</span></div>
          </b-col>
          <b-col cols="4"></b-col>
          <b-col>
            <b-button class="button-paynow" :disabled="isPaymentSuccess" type="submit" variant="primary">PAY NOW</b-button>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </div>
</template>

<script src="./Card.js"></script>
<style src="./Card.scss" lang="scss" scoped></style>