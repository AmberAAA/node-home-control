let emit = require('./bus')
let express = require('express')
let api = require('./api/index')
let path = require('path')


emit.addListener('success', function () {
    console.log('hear success')
})

let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)



app.use('/static', express.static('static'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/', function(req, res) {
    res.render('index');
})

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/',function (res, req) {
    console.log(path.join(__dirname,'./index.html'))
    req.sendFile(path.join(__dirname,'./index.html'))
})

app.use('/api', api)

emit.addListener('success',function () {
    app.listen(8080)
})
