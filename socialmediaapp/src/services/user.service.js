import User from '../models/user.js'
import * as dotenv from 'dotenv'

dotenv.config()

const updateUser = async (req) => {
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
      return {
        status: 'true',
        message: 'Account has been  updated ',
        data: user,
      }
    }
  } catch (err) {
    return { status: false, message: err.message }
  }
}

const deleteUser = async (req) => {
  const _id = req.params.id

  try {
    await User.findByIdAndDelete(_id)
    return {
      status: 'true',
      message: 'Account has been  deleted ',
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}

const getUser = async (req) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    console.log(user._doc)
    const { password, updatedAt, createdAt, ...others } = user._doc
    return {
      status: 'true',
      message: 'user has been found',
      data: others,
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}

const followUser = async (req, res) => {
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
        return {
          status: true,
          message: 'You are now following this Account!',
        }
      } else {
        return {
          status: 403,
          message: 'You already followed this account!',
        }
      }
    } catch (error) {
      return { status: false, massage: err.message }
    }
  } else {
    return {
      status: 403,
      message: 'You cannot follow yourself! ',
    }
  }
}

export { updateUser, deleteUser, getUser, followUser }
