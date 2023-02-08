import express from 'express'
const router = express.Router()
import * as AuthRoute from './auth.route.js'
import * as UserRoute from './user.route.js'
import * as ProductRoute from './product.route.js'
import * as CartRoute from './cart.route.js'
import * as OrderRoute from './order.route.js'
router.use('/auth', AuthRoute.router)
router.use('/user', UserRoute.router)
router.use('/product', ProductRoute.router)
router.use('/cart', CartRoute.router)
router.use('/order', OrderRoute.router)
export { router }
