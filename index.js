let db = require('./api/db.js')
let emit = require('./bus')
let server = require('./server')

emit.addListener('success', function () {
    console.log('hear success')
})

