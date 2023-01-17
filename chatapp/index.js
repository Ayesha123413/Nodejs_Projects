const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const port = process.env.port || 3000
//attach http to socket.io
const io = require('socket.io')(server)
app.use(express.static(__dirname + '/public'))

//variable of objext . it contains all users with their id who joined the app
var users = {}
//create a new connection means on() connect all users to app
io.on('connection', (socket) => {
  socket.on('new-user-joined', (username) => {
    users[socket.id] = username
    console.log(users)
    //inform all the other users that a new user is connected
    socket.broadcast.emit('user-connected', username)
    io.emit('user-list', users)
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', (user = users[socket.id]))
    delete users[socket.id]
    io.emit('user-list', users)
  })

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data)
  })
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

server.listen(port, () => {
  console.log('server is running on port' + port)
})
