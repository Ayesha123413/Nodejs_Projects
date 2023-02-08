import * as SendServices from '../service/sendmail.service.js'

const sendMail = async (req, res) => {
  const responce = await SendServices.sendMail(req)
  res.send(responce)
}

export { sendMail }
