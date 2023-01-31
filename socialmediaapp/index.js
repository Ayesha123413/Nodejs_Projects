import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import * as route from './src/routes/index.js'

const app = express()
const PORT = process.env.PORT || 8080
dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/api', route.router)
// app.use('/api/auth', route.router)
// app.use('/api/post', postroute.router)
// app.use('/api/user', userroute.router)
//connect with MongoDB
mongoose.set('strictQuery', true)
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

app.listen(PORT, () => {
  console.log('app is runing at port ' + PORT)
})
