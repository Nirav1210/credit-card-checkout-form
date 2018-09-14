# credit-card-checkout-form
A credit card checkout form using vue.js
- This project is created with `Vue CLI 3` ( [link](https://cli.vuejs.org/) )
- This project is an implementation of the following design. ( [Link](https://dribbble.com/shots/4845299-Daily-UI-Credit-Card-Checkout) )

![alt text](https://cdn.dribbble.com/users/2346953/screenshots/4845299/pay_card.png "screenshot of downstream job settings in Jenkins")
- There is no back-end for now, but will be added as part of the next step.
- Credit card form validates data, and displays a message on success otherwise shows an error/errors.

## Project setup

### Clone the repo and go into the directory
```
git clone https://github.com/Nirav1210/credit-card-checkout-form.git
cd credit-card-checkout-form
```

### Install all the depedencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start
```

### Compiles and minifies for production
```
npm run build
```

### Run unit tests
```
npm run test
```

## Features
- Numeric only, Alphabets only fields (to prevent users from typing incorrect information)
- Auto-tabbing between input fields based on maxLength
- validation for each input field
- Error handling for each input fields
- Dynamic updation of card type icon (based on provided card number)

## Libraries used

### For Layout 
- Bootstrap + Vue ( [Link](https://bootstrap-vue.js.org/) )

### For Card validation
- payment ( [Link](https://github.com/jessepollak/payment#readme) )

### For Unit tests
- Vue Test Utils( [Link](https://vue-test-utils.vuejs.org/) )




