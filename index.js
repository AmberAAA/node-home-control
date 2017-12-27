let db = require('./api/db.js')
let emit = require('./bus')
let server = require('./server')
let express = require('express')
let http = require('http')

emit.addListener('success', function () {
    console.log('hear success')
})


var server = new http.Server()

server.on('request', (req, res) =>{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end('server is running');
})

server.listen(8080)
