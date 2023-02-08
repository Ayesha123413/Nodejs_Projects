import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import * as route from './src/routes/index.js'
const app = express()

const port = process.env.PORT || 4000
mongoose.set('strictQuery', true)
app.use(express.json())
dotenv.config()

mongoose
  .connect(process.env.MONGO_BD_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('database is connected ')
  })
  .catch((error) => {
    console.log(error.message)
  })
app.use('/api', route.router)
app.listen(port, () => {
  console.log('App is running on the port' + port)
})
