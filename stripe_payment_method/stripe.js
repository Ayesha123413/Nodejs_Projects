import stripe from "stripe";
const STRIPE_SECRET_KEY =
  "sk_test_51M4cj7GP5UTaUYFNYMenh9HccwTlPZKM9pHmrXm0ZkjpigEwxGLEvZtJx3klfGI6YrImIjdOMcr1EgEf1Ptp6M7L002PU2C2YH";
const Stripe = stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

//add new customer to your stripe dashboard

const addNewCustomer = async (email) => {
  const customer = await Stripe.customers.create({
    email,
    description: "New customer",
  });

  return customer;
};

const createCheckoutSession = async (customer, price) => {
  const session = await Stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer,
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],

    //free trial
    subscription_data: {
      trial_period_days: 30,
    },
    success_url:
      "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/failed",
  });
  return session;
};

export { addNewCustomer, createCheckoutSession };
