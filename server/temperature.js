let emmit = require('../bus')
let fs = require('fs')
let db = require('../api/db')
let assert =require('assert')

emmit.addListener('success',function () {
    //每30分钟写一次数据库
/*    setInterval(function () {
        fs.readFile('/sys/bus/w1/devices/28-0517602a5bff/w1_slave', {flag: 'r', encoding: 'utf8'}, function (err, data) {
            assert.equal(err, null)
            db.insertOne('temperature',{
                temperature:data.split('t=')[1] / 1000,
                createTime:new Date() -0
            },(err, rep) => {
            })
        })
    },1000*60*3)*/
})