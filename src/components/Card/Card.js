import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
import Payment from "payment/lib";

export default {
    name: "Card",
    props: {
        cardInfo: {
            type: Object,
            default: function () {
                return {
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
            }
        }
    },
    data() {
        return {
            card: this.cardInfo,
            cardTypes: ["mastercard", "visa"],
            numberSets: ["", "", "", ""],
            isError: false,
            errors: {
                cardNumber: "",
                expiryMonth: "",
                expiryYear: "",
                cardCVC: ""
            }
        };
    },
    methods: {
        getImgUrl(src) {
            var images = require.context("../../assets/", false, /\.png$/);
            return images("./" + src + ".png");
        },
        getValidityState(field) {
            return field.length > 0 ? false : null;
        },
        onSubmit(evt) {
            evt.preventDefault();
            this.card.cardNumber = this.numberSets.join("");
            this.errors = this.validateForm(this.card);
        },
        validateForm(card) {
            const isValidNumber = Payment.fns.validateCardNumber(card.cardNumber);
            const isValidCardType = this.cardTypes.includes(
                Payment.fns.cardType(card.cardNumber)
            );
            const isValidCVC = Payment.fns.validateCardCVC(card.cvc);
            const isValidExpiry = Payment.fns.validateCardExpiry(
                card.expiry.month,
                card.expiry.year
            );

            let errorList = {
                cardNumber: "",
                expiryMonth: "",
                expiryYear: "",
                cardCVC: ""
            };
            if (isValidCardType) {
                this.card.cardType = Payment.fns.cardType(card.cardNumber);
            }
            if (!isValidNumber) {
                errorList.cardNumber = "Please correct your card number";
            }
            if (!isValidCVC) {
                errorList.cardCVC = "CVC number is not valid";
            }
            if (!isValidExpiry) {
                errorList.expiryMonth = "Please enter correct expiration month";
                errorList.expiryYear = "Please enter correct expiration year";
            }
            return errorList;
        }
    },
    directives: {
        numericOnly: {
            bind(el) {
                el.addEventListener("keyup", () => {
                    let regex = /^[0-9]*$/;
                    if (!regex.test(el.value)) {
                        el.value = el.value.slice(0, -1);
                    }
                });
            }
        },
        autoTab: {
            bind(el) {
                el.addEventListener("keyup", () => {
                    if (el.value.length === el.maxLength) {
                        focusNextElement();
                    }
                });
            }
        }
    },
    computed: {
        // a computed getter
        cardNumber: function () {
            // `this` points to the vm instance
            return this.card.numberSets.join("");
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
    var focussableElements =
        'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement && document.activeElement.form) {
        var focussable = Array.prototype.filter.call(
            document.activeElement.form.querySelectorAll(focussableElements),
            function (element) {
                //check for visibility while always include the current activeElement
                return (
                    element.offsetWidth > 0 ||
                    element.offsetHeight > 0 ||
                    element === document.activeElement
                );
            }
        );
        var index = focussable.indexOf(document.activeElement);
        if (index > -1) {
            var nextElement = focussable[index + 1] || focussable[0];
            nextElement.focus();
        }
    }
}