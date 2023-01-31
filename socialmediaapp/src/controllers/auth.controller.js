import * as AuthService from '../services/auth.services.js'

const registerUser = async (req, res) => {
  const responce = await AuthService.registerUser(req)
  res.json(responce)
}

const loginUser = async (req, res) => {
  const responce = await AuthService.loginUser(req)
  res.json(responce)
}
export { registerUser, loginUser }
