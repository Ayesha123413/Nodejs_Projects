import express from 'express'
const router = express.Router()
import User from '../models/user.js'
import bcrypt from 'bcrypt'

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.json({ message: 'fill all fields!' })
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

    res.status(200).json(createUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.json({ message: 'please fill the data' })
    }
    const _userExist = await User.findOne({ email: email })
    //compare password
    if (_userExist) {
      const passwordMatch = await bcrypt.compare(password, _userExist.password)
      if (passwordMatch) {
        res.status(200).json({
          message: 'you are logged in',
          data: { user: _userExist },
        })
      }
      res.status(404).json({
        status: false,
        message: 'Wrong password',
      })
    }
    res.json({
      status: false,
      message: 'Wrong credentials',
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

export { router }
