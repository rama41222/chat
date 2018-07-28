const socketio = require('socket.io')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const { defaultConfig } = require('./config/index')
const { setClient, getClients, removeClient, getClientById }  = require('./models/Client')()

const app = express()
app.use(bodyParser.json())
const server = http.Server(app)
const io = socketio(server)


io.on('connection', function (client) {
    console.log(client.id, ' connected')
    
    client.on('register', function (data) {
        setClient(client.id, data.name)
        client.emit('user',{ hasRegistered: true, user: getClientById(client.id) } )
        io.emit('userlist',{ users: getClients() } )
    })
    
    client.on('disconnect', function () {
        removeClient(client.id)
    })
    
})

server.listen(defaultConfig.port, defaultConfig.host, (err) => {
    if(err) {
        console.log(err)
        process.exit(1)
    }
    console.log(`Chat server is running at: ${defaultConfig.host}:${defaultConfig.port}`)
})