let bus = require('./index')
let io = require('socket.io')(require('../config').socketPart)

io.on('connection', function (socket) {
  console.log('on connection')

  bus.on('light', function () {
    console.log('hear light')
    socket.emit('light')
  })

})
