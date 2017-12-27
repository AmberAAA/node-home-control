let db = require('./api/db.js')
let emit = require('./bus')
let server = require('./server')
let express = require('express')
let http = require('http')

emit.addListener('success', function () {
    console.log('hear success')
})


var servers = new http.Server();
servers.on('request',(req,res)=>{
    console.log(req.url);
    //设置应答头信息
    res.end('running');
});
servers.listen(8080);
