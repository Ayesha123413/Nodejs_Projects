import Cart from '../models/cart.js'

const createCart = async (req) => {
  const newCart = new Cart(req.body)
  try {
    const createCart = await Cart.create(newCart)
    return {
      status: 200,
      data: createCart,
    }
  } catch (err) {
    return {
      message: err.message,
    }
  }
}

const updateCart = async (req) => {
  const _id = req.params.id
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true },
    )

    return {
      status: 'true',
      message: 'Cart has been  updated ',
      data: updatedCart,
    }
  } catch (err) {
    return { status: false, message: err.message }
  }
}

const deleteCart = async (req) => {
  const _id = req.params.id

  try {
    await Cart.findByIdAndDelete(_id)
    return {
      status: 'true',
      message: 'cart has been  deleted ',
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}

const getCart = async (req) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
    return {
      status: 'true',
      message: 'Cart has been found',
      data: cart,
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}
const getAllCart = async (req) => {
  try {
    const carts = await Cart.find()

    return {
      status: 'true',
      message: 'Cart has been found',
      data: carts,
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}
export { createCart, updateCart, deleteCart, getCart, getAllCart }
