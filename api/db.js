/*
*  链接数据库
* */

let MongoClient = require('mongodb').MongoClient
let DB_CONN_SRT = 'mongodb://localhost/home'

let start = function () {
    let db = null
    let flag = false

    this.insertOne = function (col, data, fn) {
        // Get the documents collection
        const collection = db.collection(col);
        collection.insertOne(data, fn)
    }

    this.upDate = function (col, data, fn) {
        const  collection = db.collection(col)
        collection.updateWriteOpResult()
    }

    MongoClient.connect(DB_CONN_SRT,function (err, database) {
        console.log('数据库成功链接')
        flag = true
        db = database
    })
}

module.exports = start