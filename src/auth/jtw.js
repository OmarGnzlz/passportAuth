const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')
const config = require('../config/index')

const Model = require('../store/models/user')

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies.token;
    }
    console.log(token)
    return token;
};

passport.use(
    new Strategy(
        {
            secretOrKey : config.jwt_secret,
            jwtFromRequest : cookieExtractor
            
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