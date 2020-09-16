const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema( {
    name: String,
    userName: String,
    email: String,
    password: String
})

const userModel = mongoose.model("User", mySchema)

module.exports = userModel