import nodemailer from 'nodemailer'

const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount()
  //connection with smtp
  let transporter = await nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    /*sender email's credentials , we cnnot use ctual email addresses bcs this server(Ethereal) 
    is fake if doesn't work with real email*/
    auth: {
      user: 'myron.kris@ethereal.email',
      pass: 'BYSFJJZHNuJAFtQKAt',
    },
  })

  let info = await transporter.sendMail({
    from: '" Ayesha Nazar👻" <myron.kris@ethereal.email>', // sender address
    to: 'ayeshanazar21619@gmail.com', // list of receivers
    subject: 'Hello Receiver! ✔', // Subject line
    text: 'Hey ! how are you?', // plain text body
    html: '<b>Hello</b>', // html body
  })
  //email can be checked by ehtereal's message section

  console.log('Message sent: %s', info.messageId)
  return { info }
}

export { sendMail }
