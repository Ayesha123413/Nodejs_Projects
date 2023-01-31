import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const generateAccessToken = async (_payload) => {
  return jwt.sign({ _payload }, process.env.SECRET_KEY, { expiresIn: 3000 })
}

const verifyAuthToken = () => {
  return (req, res, next) => {
    const token = req.headers['authorization']
    //console.log('token is working' + token)
    if (!token) {
      return res.status(403).json({ message: 'Token not found' })
    } else {
      const tokenBody = token.slice(7)
      //console.log(tokenBody)
      jwt.verify(tokenBody, process.env.SECRET_KEY, (error) => {
        if (error) {
          return res
            .status(401)
            .json({ message: 'Access denied, expire token' })
        }
        next()
      })
    }
  }
}

export { generateAccessToken, verifyAuthToken }
