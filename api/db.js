/*
*  链接数据库
* */

let MongoClient = require('mongodb').MongoClient
let config = require('../config')
let emmit = require('../bus')
let assert = require('assert')
let DB_CONN_SRT = config.DB_CONN_SRT

console.log(DB_CONN_SRT)

let start = function () {
    let db = null

    this.insertOne = function (col, data, fn) {
        // Get the documents collection
        const collection = db.collection(col);
        collection.insertOne(data, fn)
    }

    this.upDate = function (col, data, fn) {
        const  collection = db.collection(col)
        collection.updateWriteOpResult()
    }

    MongoClient.connect(DB_CONN_SRT,function (err, client) {
        if(err) throw err
        flag = true
        db = client
        emmit.emit('success')
    })
}


module.exports = new start()