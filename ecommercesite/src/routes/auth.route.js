import express from 'express'
const router = express.Router()
import * as dotenv from 'dotenv'
import * as AuthController from '../controllers/auth.controller.js'

dotenv.config()

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)

export { router }
