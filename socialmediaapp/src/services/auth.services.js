import User from '../models/user.js'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { generateAccessToken } from '../Utilities/authentication.js'

dotenv.config()

const registerUser = async (req) => {
  try {
    const { userName, email, password } = req.body

    if (!userName || !email || !password) {
      return { message: 'fill all fields!' }
    }

    //Hashing pssword
    const salt = await bcrypt.genSalt(10)
    const _password = await bcrypt.hash(req.body.password, salt)
    console.log('runnig')
    console.log({ ...req.body })
    //create User
    const createUser = await User.create({
      ...req.body,
      password: _password,
    })

    return {
      status: 200,
      message: 'Account has been created!',
      data: createUser,
    }
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    }
  }
}

const loginUser = async (req) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return { message: 'please fill the data' }
    }
    const _userExist = await User.findOne({ email: email })
    //compare password
    if (_userExist) {
      const passwordMatch = await bcrypt.compare(password, _userExist.password)
      if (passwordMatch) {
        let token = await generateAccessToken(_userExist)
        return {
          status: 200,
          message: 'you are logged in',
          data: { token: token, user: _userExist },
        }
      }
      return {
        status: 404,
        message: 'Wrong password',
      }
    }
    return {
      status: false,
      message: 'Wrong credentials',
    }
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    }
  }
}
export { registerUser, loginUser }
