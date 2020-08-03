/* Module dependencies */
let socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('massage-input')
const messageContainer = document.getElementById('message-container')


//onLoad message
appendMessage('You Joind the Chat')
socket.emit('new-user', name)

//render a message
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

//user connected
socket.on('user-connected', name => {
    appendMessage(` ${name} connected...`)
    console.log('Coneect to the LiveChat')
})

//user disconnected
socket.on('user-disconnected', name => {
    appendMessage(` ${name} disconnected...`)
})


//FormHandler
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value;
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = '';
})

//messageHandler
function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.className = 'message-div'
    messageElement.innerHTML = message
    messageContainer.append(messageElement)
}
