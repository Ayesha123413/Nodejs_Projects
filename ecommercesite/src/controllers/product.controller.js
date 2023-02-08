import * as ProductService from '../services/product.service.js'

const createProduct = async (req, res) => {
  const responce = await ProductService.createProduct(req)
  res.json(responce)
}

const updateProduct = async (req, res) => {
  const responce = await ProductService.updateProduct(req)
  res.json(responce)
}
const deleteProduct = async (req, res) => {
  const responce = await ProductService.deleteProduct(req)
  res.json(responce)
}
const getProduct = async (req, res) => {
  const responce = await ProductService.getProduct(req)
  res.json(responce)
}

const getAllProducts = async (req, res) => {
  const responce = await ProductService.getAllProducts(req)
  res.json(responce)
}
export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
}
