import express, { Router } from 'express'
const router = express.Router()
import Stripe from 'stripe'
const stripe = Stripe(STRIPE_KEY, {
  apiVersion: '2020-08-27',
})

router.post('/payment', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr)
      } else {
        res.status(500).json(stripeRes)
      }
    },
  )
})
export { router }
