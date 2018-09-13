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
                    amount: "",
                    name: {
                        firstName: "",
                        lastName: ""
                    },
                    cardNumber: ["", "", "", ""],
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
            isError: false,
            errors: {
                cardNumber: "",
                expiryDate: "",
                cardCVC: "",
                cardName: ""
            },
            isPaymentSuccess: false
        };
    },
    created() {
        // set amount value once card instance is created
        this.card.amount = "100$";
    },
    methods: {
        /**
         * Display card type icon on the screen
         * @param {String} type - type of the card
         */
        getImgUrl(type) {
            var images = require.context("../../assets/", false, /\.png$/);
            return images("./" + type + ".png");
        },
        /**
         * if the errorString value exists, then input state is invalid
         * @param {String} errorString - error string
         */
        getValidityState(errorString) {
            return errorString.length > 0 ? false : null;
        },
        /**
         * Submit the credit card form
         */
        onSubmit() {
            // validate provided input values
            this.validateForm(this.card);
            // if no errors, display `success` message and
            // disable the 'pay now' button.
            if (!this.isError) {
                this.isPaymentSuccess = true;
            } else {
                this.isPaymentSuccess = false;
            }
        },
        /**
         * Validates user provided values using a library called 'payment'
         * https://www.npmjs.com/package/payment
         * @param {Object} card - card object containing input values
         */
        validateForm(card) {
            const isValidNumber = Payment.fns.validateCardNumber(card.cardNumber.join(""));
            const isValidCVC = Payment.fns.validateCardCVC(card.cvc);
            const isValidExpiry = Payment.fns.validateCardExpiry(
                card.expiry.month,
                card.expiry.year
            );
            const fullName = card.name.firstName + card.name.lastName;
            const isValidName = fullName.length > 0 && /^[a-zA-Z]*$/.test(fullName) ? true : false;

            this.handleErrors(isValidNumber, isValidCVC, isValidExpiry, isValidName);
        },
        /**
         * Generate error messages based on provided input values
         * @param {Boolean} isValidNumber - validity result for card number
         * @param {Boolean} isValidCVC - validity result for card cvc
         * @param {Boolean} isValidExpiry - validity result for card expiration
         */
        handleErrors(isValidNumber, isValidCVC, isValidExpiry, isValidName) {
            this.errors = {
                cardNumber: "",
                expiryDate: "",
                cardCVC: "",
                cardName: ""
            };
            this.isError = false;
            if (!isValidNumber) {
                this.errors.cardNumber = "Please correct your card number";
                this.isError = true;
            }
            if (!isValidCVC) {
                this.errors.cardCVC = "Please enter a valid CVC number";
                this.isError = true;
            }
            if (!isValidExpiry) {
                this.errors.expiryDate = "Please enter a valid month and date";
                this.isError = true;
            }
            if (!isValidName) {
                this.errors.cardName = "Please enter a valid firstname and lastname";
                this.isError = true;
            }
        }
    },
    directives: {
        // allows only numeric values in an input field
        numericOnly: {
            bind(el) {
                el.addEventListener("keyup", () => {
                    let regex = /^[0-9]*$/;
                    if (!regex.test(el.value)) {
                        el.value = el.value.replace(/\D/g,'');
                    }
                });
            }
        },
        // allow only alphbet values in an input field
        alphabetsOnly: {
            bind(el) {
                el.addEventListener("keyup", () => {
                    let regex = /^[a-zA-Z]*$/;
                    if (!regex.test(el.value)) {
                        el.value = el.value.replace(/[^A-Za-z]/g, '');
                    }
                });
            }
        },
        // enable auto tabs between input fields based on maxLength value
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
        // TODO: currently defaults to 'mastercard' if card type can not
        // be identified, which needs to be revisited and fixed to display
        // correct card type (NOTE)

        // card type get computed based on card number value
        // default value is 'mastercard'
        // https://www.npmjs.com/package/payment#paymentfnscardtypenumber
        cardType: function () {
            const isValidCardType = this.cardTypes.includes(
                Payment.fns.cardType(this.card.cardNumber.join(""))
            );
            if (isValidCardType) {
                return Payment.fns.cardType(this.card.cardNumber.join(""));
            } else {
                return "mastercard";
            }
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