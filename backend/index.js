const socketio = require('socket.io')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const {defaultConfig} = require('./config/index')
const {setClient, getClients, removeClient, getClientById} = require('./models/Client')()
const {setPublicChatRecord, getPublicChatRecords} = require('./models/PublicChat')()
const {setPrivateChatRecord, getPrivateChatRecordsByRoomId} = require('./models/PrivateChat')()

const app = express()
app.use(bodyParser.json())
const server = http.Server(app)
const io = socketio(server)


io.on('connection', function (client) {
    console.log(client.id, ' connected')
    
    client.on('register', function (data) {
        setClient(client.id, data.name)
        client.emit('user', {hasRegistered: true, user: {id: client.id, name: getClientById(client.id)}})
        const publicHistory = getPublicChatRecords()
        if (publicHistory && publicHistory.length > 0) {
            client.emit('newpublicmessage', publicHistory)
        }
        io.emit('userlist', {users: getClients()})
        
    })
    
    client.on('subscribe', function (data) {
        try {
            
            if (typeof data.to.id === 'undefined' || typeof data.from.id === 'undefined' || !data.to || !data.from) {
                return
            }
            
            client.join(data.roomid)
            const history = getPrivateChatRecordsByRoomId(data.roomid)
            
            if (history && history.length > 0) {
                client.emit('newprivatemessage', history)
                io.sockets.connected[data.user.id].emit('newprivatemessage', history)
            }
            io.sockets.connected[data.to.id].emit('request', { roomid: data.roomid , to: data.to, from: data.from});
            
        } catch (e) {
            client.emit('errors', 'Please Reconnect Again')
        }
        
    })
    
    client.on('private-chat', function (data) {
        try {
            setPrivateChatRecord(data)
            client.broadcast.to(data.roomid).emit('privatemessage', {
                message: data.message,
                roomid: data.roomid,
                from: data.from
            })
            io.sockets.connected[data.to.id].emit('privatemessage', {
                to: data.to,
                message: data.message,
                roomid: data.roomid,
                from: data.from
            })
            io.sockets.connected[data.from.id].emit('privatemessage', {
                from: data.to,
                message: data.message,
                roomid: data.roomid,
                from: data.from
            })
        } catch (e) {
            client.emit('errors', 'Please Reconnect Again')
        }
    })
    
    
    client.on('public-chat', function (data) {
        try {
            setPublicChatRecord(data)
            io.emit('publicmessage', {message: data.message, roomid: data.roomid, from: data.from})
        } catch (e) {
            client.emit('errors', 'Please Reconnect Again')
        }
    })
    
    client.on('create-private-room', function (data) {
        try {
            if (client.id !== data.self.id) {
                client.emit('errors', 'Unauthorized Client')
                client.emit('login')
                return
            }
            
            let roomId = `${data.user.id}-${data.self.id}`
            roomId = roomId.split('').sort().join('')
            client.join(data.roomid)
            client.emit('privatechatready', {roomid: roomId, to: data.user, from: data.self})
            
        } catch (e) {
            client.emit('errors', 'Error Occured Fetching Chat History')
        }
    })
    
    client.on('user-request', function () {
        io.emit('userlist', {users: getClients()})
    })
    
    client.on('private-chat-history', function (id) {
        try {
            
            if (typeof id === 'undefined' || !id) {
                return
            }
            //{ roomid: data.roomid, to: data.to, from: data.from}
            
            // client.join(data.roomid)
            const history = getPrivateChatRecordsByRoomId(id)
            
            if (history && history.length > 0) {
                client.emit('newprivatemessage', history)
            }
            // io.sockets.connected[data.to.id].emit('request', { roomid: data.roomid , to: data.to, from: data.from});
            
        } catch (e) {
            client.emit('errors', 'Please Reconnect Again')
        }
    })
    
    client.on('disconnect', function () {
        removeClient(client.id)
        io.emit('userlist', {users: getClients()})
    })
    
})

server.listen(defaultConfig.port, defaultConfig.host, (err) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    console.log(`Chat server is running at: ${defaultConfig.host}:${defaultConfig.port}`)
})
