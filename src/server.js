const passport = require('passport')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()
const router = require('./api/routes')
const config = require('./config/index')

const DB = require('./store/index')

            


DB(config.db_uri)

//confing
app.use(express.json())
app.use(express.urlencoded( { extended: true }))
// app.use(cookieParser)
// app.use(session({ resave: false, saveUninitialized:false, secret: "supersecretkey"}))
// app.use(passport.initialize())
// app.use(passport.session())

//routes
router(app)

app.listen(config.port, console.log(`http://localhost:${config.port}`))