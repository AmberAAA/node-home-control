let express = require('express')
let db = require('./db')
let api = express()
let bodyParser = require('body-parser')

api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

api.get('/',function (req, res) {
    res.end('api')
})

api.get('/temperature',function (req, res) {
    db.findTemperature(function (item) {
        res.send(item)
        res.end()
    })
})

api.post('/temperature',function (req, res) {
    let tem = req.body.temperature
    if(tem && tem-1 === tem-1){
        if(-10<tem && tem<50){
            //todo 数据应该是正常的
        }else{
            //todo 数据异常
        }
        db.insertTemperatur(tem,function (err) {
            if(err)
                res.end('err')
            else
                res.end(tem)
        })
    }else{
        res.end('err')
    }
})


module.exports = api