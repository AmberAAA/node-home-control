let bus = require('./index')
let io = require('socket.io')(require('../config').socketPart)
let socket = null

io.on('connection',function (req) {
    console.log('on connection')
    socket = req

    bus.on('setLight', (data)=>{
        socket.emit('setLight',{data:data.data})
    })

    bus.on('set-light',(data) => {
        socket.emit('set-light',{})
    })

    bus.on('')
/*    socket.on('amber',function (data) {
        console.dir(data)
    })

    socket.emit('heihei', {data:'asd'})*/
})


