import express from 'express'
const router = express.Router()
import User from '../models/user.js'
import bcrypt from 'bcrypt'

//update user

router.post('/updateuser/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    if (user) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
        console.log(req.body.password)
      }
      await user.updateOne(req.body, { new: true })
      console.log(user)
      res.json({
        status: 'true',
        message: 'Account has been  updated ',
        data: user,
      })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//delete user
router.delete('/deleteuser/:id', async (req, res) => {
  const _id = req.params.id

  try {
    await User.findByIdAndDelete(_id)
    res.json({
      status: 'true',
      message: 'Account has been  deleted ',
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

//get a user

router.get('/getuser/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    console.log(user._doc)
    const { password, updatedAt, createdAt, ...others } = user._doc
    res.json({
      status: 'true',
      message: 'user has been found',
      data: others,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

//follow a User

router.put('/follow/:id', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      console.log(user)
      const currentUser = await User.findById(req.body.userId)
      console.log(currentUser)
      if (!user.followers.includes(req.body.userId)) {
        console.log(!user.followers.includes(req.body.UserId))
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { followings: req.params.id } })
        res.status(200).json({
          message: 'You are now following this Account!',
        })
      } else {
        res.status(403).json({
          message: 'You already followed this account!',
        })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json({
      message: 'You cannot follow yourself! ',
    })
  }
})
export { router }
