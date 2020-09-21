const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')
const config = require('../config/index')

const Model = require('../store/models/user')

passport.use(
    new Strategy(
        {
            secretOrKey : config.jwt_secret,
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
            
        },

        async (tokenPayload, cb) => {
            try {
                const user = Model.findOne({email: tokenPayload.email})

                if(!user){
                    return cb(boom.unauthorized(), false)
                }

                delete user.password

                cb(null, {...user})
            } catch (error) {
                return cb(error)
            }
        }
    )
)