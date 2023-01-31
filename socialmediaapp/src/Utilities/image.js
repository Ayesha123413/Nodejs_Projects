import fs from 'fs'

const addImage = async (image) => {
  if (!fs.existsSync('./uploads')) {
    //make directory if it does not exist
    fs.mkdir('./uploads', { recursive: true }, (err) => {
      if (err) throw err
    })
  }
  //convert base64 into image data
  let data = image.replace(/^data:image\/\w+;base64,/, '')
  let filename = Date.now() + '.png'
  //write filename with directory and place dat into it
  fs.writeFile(
    `./uploads/${filename}`,
    data,
    { encoding: 'base64' },
    async function (err) {
      if (err) return err
    },
  )

  return filename
}

export { addImage }
