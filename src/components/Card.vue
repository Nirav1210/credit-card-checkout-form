<template>
  <div class="form-container">
    <b-form @submit="onSubmit" name="creditCardForm">
      <div class="left-container">
        <b-form-group label="CARD NUMBER" id="cardNumber" :invalid-feedback="errors.cardNumber" :state="getValidityState(errors.cardNumber)">
          <b-row>
            <b-col v-for="(item, index) in numberSets" :key="index">
              <b-form-input :class="`inputs-${index}`" type="text" maxlength="4" :id="`${index}`" v-model="numberSets[index]"
                v-numericOnly v-autoTab required placeholder="0000" :state="getValidityState(errors.cardNumber)">
              </b-form-input>
            </b-col>
          </b-row>
        </b-form-group>
        <b-row>
          <b-col cols="4">
            <b-form-group class="card-firstname" label="FIRST NAME">
              <b-form-input type="text" maxlength="20" v-autoTab v-model="card.name.firstName" required>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group class="card-lastname" label="LAST NAME">
              <b-form-input type="text" maxlength="20" v-autoTab v-model="card.name.lastName" required>
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="MONTH" :invalid-feedback="errors.expiryMonth" :state="getValidityState(errors.expiryMonth)">
              <b-form-input type="text" id="expiryMonth" v-numericOnly maxlength="2" v-model="card.expiry.month"
                v-autoTab required :state="getValidityState(errors.expiryMonth)" placeholder="00">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="YEAR" :invalid-feedback="errors.expiryYear" :state="getValidityState(errors.expiryYear)">
              <b-form-input type="text" id="expiryYear" v-numericOnly maxlength="4" v-model="card.expiry.year"
                v-autoTab required :state="getValidityState(errors.expiryYear)" placeholder="0000">
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

<script src="./Card.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Card.scss" lang="scss" scoped></style>