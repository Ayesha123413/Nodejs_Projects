import express from 'express'
const router = express.Router()
import * as dotenv from 'dotenv'
import * as UserController from '../controllers/user.controller.js'
import { verifyAuthToken } from '../utilities/auth.js'

dotenv.config()

router.put('/updateuser/:id', verifyAuthToken(), UserController.updateUser)
router.delete('/deleteuser/:id', verifyAuthToken(), UserController.deleteUser)
router.get('/getuser/:id', verifyAuthToken(), UserController.getUser)
router.get('/getallusers', UserController.getAllUser)
//get users of particular months
router.get('/userstats', UserController.userStats)
export { router }
