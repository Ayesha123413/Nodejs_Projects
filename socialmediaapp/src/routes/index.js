import express from 'express'
const router = express.Router()

import * as route from '../routes/auth.route.js'
import * as postroute from '../routes/post.route.js'
import * as userroute from '../routes/user.route.js'

router.use('/post', postroute.router)
router.use('/user', userroute.router)
router.use('/auth', route.router)

export { router }
