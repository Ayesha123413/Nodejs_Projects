import express from 'express'
const app = express()
const PORT = 3000
import { sendMail } from './controller/sendmail.controller.js'

app.get('/', (req, res) => {
  res.send('hello')
})

app.get('/mail', sendMail)

app.listen(PORT, () => {
  console.log('I am listening to port ' + PORT)
})
