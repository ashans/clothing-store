# Crown Clothing

ReactJS application with firebase support built with support of Udemy React course

[Checkout Course](https://www.udemy.com/share/101WH43@oqUIpL9ZSeLEswTukTNYKFeztG5oSByL520Yo7Uh3hdELVrECJMPD4vZFPL3hnMhVQ==/)

## Includes
- ReactJS (18)
- React Router
- SCSS
- Styled Components
- Redux
- Redux persist
- Redux thunk/saga
- Firebase Auth
- Firebase Firestore
- Stripe Payment Gateway
- Netlify functions
- Typescript
- PWA support

## Demo

Visit [clothing-store](https://clothing-store-as.netlify.app/)

## How to run

### Prerequisites
- Installed node with npm
- Yarn

### Setup
1. Clone repository
2. Go inside cloned repository
3. Install dependencies using `yarn install`
4. Rename `.env.example` as `.env`

### Run
#### Dev mode

Run with command `yarn start`. This will open the browser with app loaded.

#### Including netlify functions
> Netlify functions are used for the integration of payments with stipe payment gateway. These are deployed in as cloud functions when deployed in Netlify cloud

1. Create [Stripe](https://stripe.com/) account and go to [Dashboard](https://dashboard.stripe.com/)
2. Turn on test mode.
3. Change `.env` file
   - Change `REACT_APP_STRIPE_PUBLISHABLE_KEY` value to **Publishable key** of stripe
   - Change `STRIPE_SECRET_KEY` value to **Secret key** of stripe
4. Install [netlify-cli](https://docs.netlify.com/cli/get-started) globally using command `npm install netlify-cli -g`
5. Run command `netlify dev` to start the server

### Build

Run command `yarn build` to create build files in `build` directory
