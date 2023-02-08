import * as OrderService from '../services/order.service.js'

const createOrder = async (req, res) => {
  const responce = await OrderService.createOrder(req)
  res.json(responce)
}

const updateOrder = async (req, res) => {
  const responce = await OrderService.updateOrder(req)
  res.json(responce)
}

const deleteOrder = async (req, res) => {
  const responce = await OrderService.deleteOrder(req)
  res.json(responce)
}

const getOrder = async (req, res) => {
  const responce = await OrderService.getOrder(req)
  res.json(responce)
}
const getAllOrder = async (req, res) => {
  const responce = await OrderService.getAllOrder(req)
  res.json(responce)
}

const getIncome = async (req, res) => {
  const responce = await OrderService.getIncome(req)
  res.json(responce)
}

export {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  getIncome,
}
