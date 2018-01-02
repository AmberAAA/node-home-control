let emit = require('./bus')
let express = require('express')
let api = require('./api/index')

emit.addListener('success', function () {
    console.log('hear success')
})

express.static('/public')

let app = express()
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api', api)

emit.addListener('success',function () {
    app.listen(8080)
})
