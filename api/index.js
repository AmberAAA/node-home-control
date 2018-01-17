let express = require('express')
let db = require('./db')
let api = express()
let bodyParser = require('body-parser')
let bus = require('../bus')

api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

api.get('/',function (req, res) {
    res.end('api')
})


/*设置,获取温度*/
api.get('/temperature',function (req, res) {
    db.findTemperature(function (item) {
        res.send(item)
        res.end()
    })
})

api.get('/temperatures',function (req, res) {
    let from = req.query.from
    let to = req.query.to
    console.log(from)
    console.log(to)

    db.findTemperatures({from,to},function (item) {
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



/*设置、获取开关装填*/
api.get('/light', function (req, res) {
    /*获取灯泡开关信息*/
    bus.emit('light')
    res.end('success')
})

api.post('/light', function (req, res) {
    bus.emit('set-light', {id:req.body.id,flag:req.body.flag,res:res})
})


module.exports = api