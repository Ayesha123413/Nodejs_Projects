import express from 'express'
import bodyparser from 'body-parser'
import got from 'got'
import cheerio from 'cheerio'
const app = express()
const port = process.env.port || 4500
app.use(bodyparser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  //this will automatically call views folder (which is for ejs)
  res.render('index.ejs', { value: '', title: '' })
})
app.post('/send-url', async (req, res) => {
  const URL = req.body.myurl

  await (async () => {
    const response = await got(URL)
    // console.log(URL)
    // console.log(response)
    const $ = cheerio.load(response.body)
    console.log($)
    let title = $('title').html()
    const value = 'value'
    console.log(title)
    res.render('index.ejs', { value: value, title: title })
  })()
})
app.listen(port, () => {
  console.log('we are listening to port ' + port)
})
