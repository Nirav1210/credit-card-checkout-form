import {
  expect
} from "chai";
import {
  shallowMount
} from "@vue/test-utils";
import Card from "@/components/Card/Card.vue";

let cardData = {};
beforeEach(() => {
  cardData = {
    amount: "$100",
    cardType: "mastercard",
    name: {
      firstName: "nirav",
      lastName: "bhut"
    },
    cardNumber: ["4242", "4242", "4242", "4242"],
    expiry: {
      month: "12",
      year: "2019"
    },
    cvc: "223"
  };
});

describe("Card.vue validation", () => {
  const wrapper = shallowMount(Card);
  it("validate if there are errors occured", () => {
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.isError).to.equal(false);
  });
  it("validate card number", () => {
    // correct card number
    cardData.cardNumber = ["4242", "4242", "4242", "4242"];
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardNumber).to.equal("");

    // incorrect card number
    cardData.cardNumber = ["4242", "4242", "4242", "424"];
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardNumber).to.equal("Please correct your card number");
  });
  it("validate card cvc", () => {
    // correct card cvc value
    cardData.cvc = "424";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardCVC).to.equal("");

    // incorrect card cvc value
    cardData.cvc = "4*2";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardCVC).to.equal("Please enter a valid CVC number");
  });
  it("validate card expiry", () => {
    // correct card expiry date
    cardData.expiry.month = "12";
    cardData.expiry.year = "2019";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.expiryDate).to.equal("");

    // incorrect value for expiry month
    cardData.expiry.month = "21";
    cardData.expiry.year = "2019";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.expiryDate).to.equal("Please enter a valid month and date");

    // incorrect value for expiry year
    cardData.expiry.month = "08";
    cardData.expiry.year = "2012";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.expiryDate).to.equal("Please enter a valid month and date");
  });
  it("validate user name on the card", () => {
    // correct card cvc
    cardData.name.firstName = "nirav";
    cardData.name.lastName = "bhut";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardName).to.equal("");

    // empty name value
    cardData.name.firstName = "";
    cardData.name.lastName = "";
    wrapper.setData({
      card: cardData
    });
    wrapper.vm.validateForm(cardData);
    expect(wrapper.vm.errors.cardName).to.equal("Please enter a valid firstname and lastname");
  });
});