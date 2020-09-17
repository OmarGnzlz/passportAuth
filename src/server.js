const express = require('express')
const app = express()
const router = require('./api/routes')

const DB = require('./store/index')

DB('mongodb+srv://omargnzlz645:resina96@cluster0.biyni.mongodb.net/social_job?retryWrites=true&=majority')

//confing
app.use(express.json())
app.use(express.urlencoded( { extended: true }))

//routes
router(app)

app.listen(3000, console.log("Server listen on http://localhost:3000"))