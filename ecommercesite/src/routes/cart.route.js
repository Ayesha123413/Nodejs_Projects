import express from 'express'
const router = express.Router()
import * as dotenv from 'dotenv'
import * as CartController from '../controllers/cart.controller.js'
import { verifyAuthToken } from '../utilities/auth.js'

dotenv.config()

router.post('/create', verifyAuthToken(), CartController.createCart)
router.put('/update/:id', verifyAuthToken(), CartController.updateCart)
router.delete('/delete/:id', verifyAuthToken(), CartController.deleteCart)
router.get('/get/:userId', verifyAuthToken(), CartController.getCart)
router.get('/getall', verifyAuthToken(), CartController.getAllCart)
export { router }
