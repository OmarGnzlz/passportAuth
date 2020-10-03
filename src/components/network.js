const express = require('express')
const router = express.Router()
const response = require('../network/response')
const controller = require('./controller')
const config = require('../config/index')
const Model = require('../store/models/user')

const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const passport = require('passport')

require('../auth/jtw')


/*             
passport.serializeUser((user, done) => {
    done(null,user[0].email )
})

passport.deserializeUser((email, done) => {
    Model.find({ email },(error, user) => {
        done(error, user)
    })
}) */


router.get('/', async (req, res) => {
    try{
        const result = await controller.getUser()
        response.success(req, res, result, 201)
    }catch(error){
        response.error(req, res, error.message, 400, error)
    } 
})

router.post('/sign-in', async (req, res) => {
    const { name, username ,email, password } = req.body
    try {
        const user = await controller.createUser(name, username, email,  password)
        console.log(user)
        response.success(req, res, user, 201)
    } catch (error) {
        response.error(req, res, error.message, 400, error)
    }
})

require('../auth/basic')
router.post('/login',  (req, res, next) => {
    //const { email, password } = req.body
    
    passport.authenticate('basic', (error, user,) => {
        try {
            if(error || !user) {
                console.log(user)
                next(boom.unauthorized("User not found"))
            }

            req.login(user, { session: false }, async (error) => {
                if(error){
                    next(error)
                }
            })

            const { _id: id, name, email } = user[0];
                        
            const payload = {
                sub: id,
                name,
                email
            }
            
            
            const token = jwt.sign(payload, config.jwt_secret,{
                expiresIn: '15m'
            });

            res.cookie('token', token, {
                httpOnly: false,
                secure: false

            }) 
            
            return  res.status(201).json({ token, "System message":"user succesfully logged in" })
            
        } catch (error) {
            next(error)
        }
    })(req, res, next)
})

router.put('/:id' , passport.authenticate('jwt', { session: false }) ,async (req, res) => {
    try {
        const { name, username, email, password } = req.body

        const user = await controller.updateUser(req.params.id, name, username, email, password)
        console.log(req.cookies.token)
        response.success(req, res, user, 201)
    } catch (error) {
        response.error(req, res, error.message, 400, error)
    }
})

router.delete('/:id', async(req, res) => {

    try {
        const userDelete = await controller.deleteUser(req.params.id)
        const message = {
            "system message": "User succesfully delete"
        }
        response.success(req, res, message, 201)
    } catch (error) {
        response.error(req, res, error.message, 400, error)
    }
})

router.get('/logout', (req, res) => {
   req.session = null
   req.logout()
   res.status(201)
})

module.exports = router