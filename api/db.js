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
    
    this.findDateOne = function (col, qerry, fn) {
        const collection = db.collection(col)
        collection.findOne(qerry).sort().toArray(function (err, item) {
            assert.equal(err, null)
            fn(item)
        })
    }

    this.findTemperature = function (fn) {
        const collection = db.collection('temperature')
        collection.find({}).sort({'createTime':-1}).limit(1).toArray(function (err, item) {
            assert.equal(err, null)
            fn(item)
        })
    }

    this.findTemperatures = function (data, fn) {
        const collection = db.collection('temperature')
        if(data&&data.from-0===data.from-0&&data.to-0===data.to-0){
            collection.find({createTime:{$gt:data.from-0,$lt:data.to-0}}).sort({createTime:-1}).toArray(function (err, item) {
                assert.equal(err, null)
                fn(item)
            })
        }else{

            fn([])
        }
    }

    this.insertTemperatur = function (number, fn) {
        const collection = db.collection('temperature');
        collection.insertOne({
            ...number,
            createTime:new Date().valueOf()
        },fn)
    }

    MongoClient.connect(DB_CONN_SRT,function (err, client) {
        if(err) throw err
        flag = true
        db = client
        emmit.emit('success')
    })
}


module.exports = new start()