import express from 'express'
const router = express.Router()
import * as AuthController from '../controllers/auth.controller.js'

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)

export { router }
