import express from 'express'
const router = express.Router()
import * as dotenv from 'dotenv'
import * as ProductController from '../controllers/product.controller.js'
import { verifyAuthToken } from '../utilities/auth.js'

dotenv.config()

router.post('/create', verifyAuthToken(), ProductController.createProduct)
router.put('/update/:id', verifyAuthToken(), ProductController.updateProduct)
router.delete('/delete/:id', verifyAuthToken(), ProductController.deleteProduct)
router.get('/get/:id', ProductController.getProduct)
router.get('/getallproducts', ProductController.getAllProducts)
export { router }
