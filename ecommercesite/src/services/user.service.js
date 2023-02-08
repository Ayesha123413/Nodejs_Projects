import User from '../models/user.js'
import bcrypt from 'bcrypt'

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

const getAllUser = async (req) => {
  const query = req.query.new
  try {
    const users = query ? await User.find().limit(2) : await User.find()
    return {
      status: 'true',
      message: 'users has been found',
      data: users,
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}

const userStats = async (req) => {
  const date = new Date()
  const lastyear = new Date(date.setFullYear(date.getFullYear() - 1))
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastyear } } },
      { $project: { month: { $month: '$createdAt' } } },
      {
        $group: {
          _id: { month: '$month' },
          totalUsers: { $sum: 1 },
        },
      },
    ])
    return { data }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}

export { updateUser, getUser, deleteUser, getAllUser, userStats }
