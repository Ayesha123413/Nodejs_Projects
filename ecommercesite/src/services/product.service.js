import Product from '../models/product.js'

const createProduct = async (req) => {
  const newProduct = new Product(req.body)
  console.log(newProduct)
  try {
    const createProduct = await Product.create(newProduct)
    return {
      status: 200,
      data: createProduct,
    }
  } catch (err) {
    return {
      message: err.message,
    }
  }
}

const updateProduct = async (req) => {
  const _id = req.params.id
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true },
    )

    return {
      status: 'true',
      message: 'Product has been  updated ',
      data: updatedProduct,
    }
  } catch (err) {
    return { status: false, message: err.message }
  }
}

const deleteProduct = async (req) => {
  const _id = req.params.id

  try {
    await Product.findByIdAndDelete(_id)
    return {
      status: 'true',
      message: 'Product has been  deleted ',
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}

const getProduct = async (req) => {
  const _id = req.params.id
  try {
    const product = await Product.findById(_id)

    return {
      status: 'true',
      message: 'Product has been found',
      data: product,
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}

const getAllProducts = async (req) => {
  const qQuery = req.query.new
  const qCategory = req.query.category
  try {
    let products
    if (qQuery) {
      products = await Product.find().limit(2)
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      })
    } else {
      products = await Product.find()
    }

    return {
      status: 'true',
      message: 'products has been found',
      data: products,
    }
  } catch (err) {
    return { status: false, massage: err.message }
  }
}

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
}
