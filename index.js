let db = require('./api/db.js')
let emit = require('./bus')
let express = require('express')
let api = require('./api/index')

emit.addListener('success', function () {
    console.log('hear success')
})

express.static('/public')

let app = express()

app.use('/api', api)

emit.addListener('success',function () {
    app.listen(8080)
})
