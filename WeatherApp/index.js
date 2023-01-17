import express from 'express'
import path from 'path'
import bodyparser from 'body-parser'
import https from 'https'
const app = express()
const port = process.env.port || 4500
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const __dirname = path.resolve()
  res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, response) => {
  console.log(req.body.cityName)

  const APIkey = '17b5e2435b0b7b56605b3811bf461fee'
  const location = req.body.cityName
  const URL =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    location +
    '&appid=' +
    APIkey +
    '&units=metric'
  https.get(URL, (res) => {
    console.log(res.statusCode)
    res.on('data', (data) => {
      console.log(data) //getting data from weather api in hexadecimal form
      const weatherdata = JSON.parse(data) //converting hexa form of data into text
      console.log(weatherdata)
      const temp = weatherdata.main.temp //get temperature from weather data
      const discription = weatherdata.weather[0].description //get description from weather data
      console.log(temp, discription)
      response.render('index.ejs', {
        location: location,
        temperature: temp,
        discription: discription,
      })
      // response.send(
      //   '<h1>The temperture of ' +
      //     location +
      //     ' is ' +
      //     temp +
      //     ' degree celcius</h1>' +
      //     '<p>The weather description is ' +
      //     discription +
      //     '</p>',
      // )
    })
  })
})

app.listen(port, () => {
  console.log('app is running at post' + port)
})
