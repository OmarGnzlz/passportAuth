const passport = require('passport')
const bomm = require('@hapi/boom')
const { OAuth2Strategy: GoogleStrategy} = require('passport-google-oauth')
const config = require('../config/index')

passport.use(new GoogleStrategy(
    {
        //
    }
))