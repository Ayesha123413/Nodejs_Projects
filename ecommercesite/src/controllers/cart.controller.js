import * as CartService from '../services/cart.service.js'

const createCart = async (req, res) => {
  const responce = await CartService.createCart(req)
  res.json(responce)
}

const updateCart = async (req, res) => {
  const responce = await CartService.updateCart(req)
  res.json(responce)
}

const deleteCart = async (req, res) => {
  const responce = await CartService.deleteCart(req)
  res.json(responce)
}

const getCart = async (req, res) => {
  const responce = await CartService.getCart(req)
  res.json(responce)
}
const getAllCart = async (req, res) => {
  const responce = await CartService.getAllCart(req)
  res.json(responce)
}
export { createCart, updateCart, deleteCart, getCart, getAllCart }
