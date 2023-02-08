import Order from '../models/order.js'

const createOrder = async (req) => {
  const newOrder = new Order(req.body)
  try {
    const createOrder = await Order.create(newOrder)
    return {
      status: 200,
      data: createOrder,
    }
  } catch (err) {
    return {
      message: err.message,
    }
  }
}

const updateOrder = async (req) => {
  const _id = req.params.id
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true },
    )

    return {
      status: 'true',
      message: 'Order has been  updated ',
      data: updatedOrder,
    }
  } catch (err) {
    return { status: false, message: err.message }
  }
}

const deleteOrder = async (req) => {
  const _id = req.params.id

  try {
    await Order.findByIdAndDelete(_id)
    return {
      status: 'true',
      message: 'Order has been  deleted ',
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}
//one usser can have multiple orders
const getOrder = async (req) => {
  try {
    const order = await Order.find({ userId: req.params.userId })
    return {
      status: 'true',
      message: 'Order has been found',
      data: order,
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}
const getAllOrder = async (req) => {
  try {
    const orders = await Order.find()

    return {
      status: 'true',
      message: 'Order has been found',
      data: orders,
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}

const getIncome = async (req) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1))
  console.log(lastMonth)
  console.log(previousMonth)
  try {
    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gte: previousMonth } },
      },
      { $project: { month: { $month: '$createdAt' }, sales: '$amount' } },
      { $group: { _id: '$month', total: { $sum: '$sales' } } },
    ])

    return {
      status: 'true',
      message: 'income has been found',
      data: income,
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}

export {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  getIncome,
}
