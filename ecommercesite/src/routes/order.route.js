import express from 'express'
const router = express.Router()
import * as dotenv from 'dotenv'
import * as OrderController from '../controllers/order.controller.js'
import { verifyAuthToken } from '../utilities/auth.js'

dotenv.config()

router.post('/create', OrderController.createOrder)
router.put('/update/:id', verifyAuthToken(), OrderController.updateOrder)
router.delete('/delete/:id', verifyAuthToken(), OrderController.deleteOrder)
router.get('/get/:userId', verifyAuthToken(), OrderController.getOrder)
router.get('/getall', verifyAuthToken(), OrderController.getAllOrder)
router.get('/income', OrderController.getIncome)

export { router }
