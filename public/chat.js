function startSession() {
  const socket = io.connect("http://localhost:3000");

  const message = document.querySelector("#message");
  const username = document.querySelector("#username");
  const send_message = document.querySelector("#send_message");
  const send_username = document.querySelector("#send_username");
  const chatroom = document.querySelector("#chatroom");
  const feedback = document.querySelector("#feedback");

  send_username.addEventListener('click', () => {
    console.log(username.value);
    socket.emit('change_username', { username: username.value });
  })

  send_message.addEventListener('click', () => {
    feedback.innerHTML = '';
    socket.emit('new_message', { message: message.value });
  })

  socket.on('add_message', (data) => {
    const message = document.createElement('div');
    message.classList.add('message');
    message.innerHTML = `<p><b>${data.username}:</b> ${data.message}</p>`;
    chatroom.append(message)
  })

  message.addEventListener('keydown', () => {
    socket.emit('typing');
  })

  socket.on('add_typing', (data) => {
    feedback.innerHTML = `<p><i>${data.username} is typing a message...</i></p>`;
  })
}
startSession()