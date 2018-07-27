const { defaultConfig } = require('./config/index')
const socketio = require('socket.io')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const server = http.Server(app)
const io = socketio(server)

io.on('connection', function (client) {
    console.log(client.id, ' connected')
})

server.listen(defaultConfig.port, defaultConfig.host, (err) => {
    if(err) {
        console.log(err)
        process.exit(1)
    }
    console.log(`Chat server is running at: ${defaultConfig.host}:${defaultConfig.port}`)
})