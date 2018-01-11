let emit = require('./bus')
let express = require('express')
let api = require('./api/index')
let cookie = require('cookie')
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

app.all('*', function (req, res, next) {
/*    if(req.cookies){
        let cook = req.cookies
        if(cook) {
            //todo 如果认证通过
        }else{
            //todo 如果认证不通过
        }
    }else{
        //todo 登陆页面
    }*/

    req.cookie
    next()
})

app.use('/api', api)

emit.addListener('success',function () {
    app.listen(require('./config').webPart)
})
