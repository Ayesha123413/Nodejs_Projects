import express from 'express'
const router = express.Router()
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import * as UserController from '../controllers/user.controller.js'
import { verifyAuthToken } from '../Utilities/authentication.js'

//update user
router.post('/updateuser/:id', verifyAuthToken(), UserController.updateUser)
//delete user
router.delete('/deleteuser/:id', verifyAuthToken(), UserController.deleteUser)
//get a user
router.get('/getuser/:id', verifyAuthToken(), UserController.getUser)
//follow a User
router.put('/follow/:id', verifyAuthToken(), UserController.followUser)

export { router }
