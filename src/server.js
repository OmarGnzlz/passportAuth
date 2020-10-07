const passport = require('passport')
const express = require('express')
const session = require('express-session')
const cookieParse = require('cookie-parser')

const app = express()
const router = require('./api/routes')
const config = require('./config/index')

const DB = require('./store/index')

            


DB(config.db_uri)

//confing
app.use(express.json())
app.set('trust proxy', 1)
app.use(express.urlencoded( { extended: true }))


app.use(cookieParse())
app.use(session({ secret: "superSecret", resave: false, saveUninitialized: true}))

app.use(passport.initialize()) 
app.use(passport.session()) 

//routes
router(app)

app.listen(config.port, console.log(`http://localhost:${config.port}`))