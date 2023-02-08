import * as UserService from '../services/user.service.js'

const updateUser = async (req, res) => {
  const responce = await UserService.updateUser(req)
  res.json(responce)
}

const deleteUser = async (req, res) => {
  const responce = await UserService.deleteUser(req)
  res.json(responce)
}
const getUser = async (req, res) => {
  const responce = await UserService.getUser(req)
  res.json(responce)
}

const getAllUser = async (req, res) => {
  const responce = await UserService.getAllUser(req)
  res.json(responce)
}
const userStats = async (req, res) => {
  const responce = await UserService.userStats(req)
  res.json(responce)
}
export { updateUser, deleteUser, getUser, getAllUser, userStats }
