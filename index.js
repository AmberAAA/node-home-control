let emit = require('./bus')
let express = require('express')
let api = require('./api/index')
let cookie = require('cookie')
let config = require('./config')
require('./bus/io')


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
app.use('/', express.static('public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
    console.log(req.query)
    if(req.query.key === config.secretKey){
        res.render('index');
    }else{
        res.end('fuck u !')
    }
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
