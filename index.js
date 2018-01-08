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

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});


app.use('/static', express.static('static'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/', function(req, res) {
    res.render('index');
})

app.get('/test',function (req, res) {
    res.render('test')
})

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api', api)

emit.addListener('success',function () {
    app.listen(require('./config').webPart)
})
