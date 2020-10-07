const express = require('express')
const router = express.Router()
const config = require('../../config/index')

const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const passport = require('passport')

require('../../auth/google')


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }))


router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, (error, user) => {
        if(!user){
            next(boom.unauthorized('Unexpected error'))
        }
    
        const { _id: id, name, email } = user;
                            
        const payload = {
            sub: id,
            name,
            email
        }
    
        const token = jwt.sign(payload, config.jwt_secret, {
            expiresIn: '15m'
        })
    
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
        })
    
        return res.status(201).json({ token, "System message":"user succesfully logged in with google" })

    })(req, res, next)
})


module.exports = router