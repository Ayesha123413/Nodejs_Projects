import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      require: false,
    },
    description: {
      type: String,
      max: 100,
    },
    city: {
      type: String,
      max: 50,
    },
    relationship: {
      type: String,
      enum: ['Single', 'Married'],
    },
  },
  { timestamps: true },
)
const User = mongoose.model('User', userSchema)
export default User
