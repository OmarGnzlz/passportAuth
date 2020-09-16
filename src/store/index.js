const { Mongoose } = require("mongoose");

const DB = require('mongoose')

DB.Promise = global.Promise

const connect = async (url) => {
    try{
        await DB.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
        })
        console.lg("DB successfully connected")
    }catch (error){
        console.log(erro)
    }
}

module.exports = connect