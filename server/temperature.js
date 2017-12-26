let emmit = require('../bus')
let db = require('../api/db')

emmit.addListener('success',function () {
    //连接数据库后开始以每30分钟一次的速度写入实时温度
    setInterval(function () {
        db.insertOne('temperature',{
            temperature:21.3,
            createTime:new Date() -0
        },function (err, req) {
            if(err)
                console.log(err)
            if(req)
                console.log(req)
        })
    },100)
})