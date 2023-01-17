import express from 'express'
import path from 'path'
import bodyparser from 'body-parser'
import multer from 'multer'
import docxConverter from 'docx-pdf'
const app = express()
const port = process.env.port || 3000
app.use(bodyparser.urlencoded({ extended: false }))
//uploads is a directory which will store all static uploaded files,static is a middleware
app.use(express.static('uploads'))

// to set destination of file to store after upload and set filename
var fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  },
})
var upload = multer({ storage: fileStorage })

app.get('/', (req, res) => {
  const __dirname = path.resolve()
  res.sendFile(__dirname + '/index.html')
})

app.post('/docxtopdf', upload.single('file'), (req, res) => {
  console.log(req.file)
  const currentPath = req.file.path
  console.log(currentPath)
  //create new name for pdffile
  let outputPath = Date.now() + 'output.pdf'
  docxConverter(currentPath, outputPath, (err) => {
    if (err) {
      console.log(err)
    }
    res.download(outputPath)
  })
})
app.listen(port, () => {
  console.log('app is running on port' + port)
})
