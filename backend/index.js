const socketio = require('socket.io')
const http = require('http')
const uuid = require('uuid')
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
        client.emit('user',{ hasRegistered: true, user: {id: client.id, name:getClientById(client.id)} } )
        io.emit('userlist',{ users: getClients() } )
    })
    
    client.on('subscribe', function (data) {
     try {
         client.join(data.roomid)
         if(typeof data.user.id === 'undefined' || !data.user) {
             return
         }
         io.sockets.connected[data.user.id].emit('request', { roomid: data.roomid , user: data.user, me: data.me});
     } catch (e) {
         client.emit('errors', 'Please Reconnect Again')
     }
     
    })
    
    client.on('join-room', function (data) {
        client.join(data.roomid)
    })
    
    client.on('private-chat', function (data) {
        try {
            console.log(data.to)
        client.broadcast.to(data.roomid).emit('privatemessage', {message: data.message, roomid: data.roomid })
        io.sockets.connected[data.to].emit('newprivatemessage', {message: data.message, roomid: data.roomid })
        } catch (e) {
            client.emit('errors', 'Please Reconnect Again')
    
        }
    })
    
    client.on('create-private-room', function (data) {
        if(client.id !== data.self.id) {
            client.emit('errors', 'Unauthorized Client')
            return
        }
        const roomId = uuid()
        client.emit('joinroom', { roomid: roomId, user: data.user} )
    })
    
    client.on('user-request', function () {
        io.emit('userlist',{ users: getClients() } )
    })
    
    client.on('disconnect', function () {
        removeClient(client.id)
        io.emit('userlist',{ users: getClients() } )
    })
    
})

server.listen(defaultConfig.port, defaultConfig.host, (err) => {
    if(err) {
        console.log(err)
        process.exit(1)
    }
    console.log(`Chat server is running at: ${defaultConfig.host}:${defaultConfig.port}`)
})