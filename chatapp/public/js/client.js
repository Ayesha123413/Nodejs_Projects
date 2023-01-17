const socket = io()
var username
//select div with classname=chats
var chats = document.querySelector('.chats')
var users_list = document.querySelector('.users-list')
var users_count = document.querySelector('.users-count')
var user_msg = document.querySelector('#user-msg')
var msg_send = document.querySelector('#user-send')

do {
  username = prompt('Enter user name')
} while (!username)
//new user joins from frontend
socket.emit('new-user-joined', username)

/*  'username'  we have passed from index.js this socket.on()
forward message to all user's frontend that a new user is connected */
socket.on('user-connected', (username) => {
  console.log(username)
  userJoinLeft(username, 'joined')
})

/*when user join or left the chat it will show to frontend to all users 
for this purpose we have created a new div and then show msg in it*/
function userJoinLeft(name, status) {
  let div = document.createElement('div')
  /*create div with same classname=user-join(already on index.js) so that
    same styling can apply on it bcz we set styling in sass with classnames */
  div.classList.add('user-join')
  //set same structure as in user-join class
  let content = `<p><b>${name}</b>${status} the chat</p>`
  div.innerHTML = content
  chats.appendChild(div)
  chats.scrollTop = chats.scrollHeight
}

//user  is left called same function as for join
socket.on('user-disconnected', (user) => {
  userJoinLeft(user, 'left')
})

//display all connected users with their names
socket.on('user-list', (users) => {
  users_list.innerHTML = ''
  users_arr = Object.values(users)
  for (i = 0; i < users_arr.length; i++) {
    let p = document.createElement('p')
    p.innerText = users_arr[i]
    users_list.appendChild(p)
  }
  //increase value of count of members
  users_count.innerText = users_arr.length
})

//for  sending messages

msg_send.addEventListener('click', () => {
  let data = {
    user: username,
    //take value of input field in which user type mssage
    msg: user_msg.value,
  }
  if (user_msg.value != '') {
    appendMessage(data, 'outgoing')
    socket.emit('message', data)
    user_msg.value = ''
  }
})

function appendMessage(data, status) {
  let div = document.createElement('div')
  div.classList.add('message', status)
  let content = `<h5>${data.user}</h5><p>${data.msg}</p>`
  div.innerHTML = content
  chats.appendChild(div)
  chats.scrollTop = chats.scrollHeight
}

//message comming from server
socket.on('message', (data) => {
  appendMessage(data, 'incoming')
})
