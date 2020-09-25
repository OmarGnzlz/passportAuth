const passport = require('passport')
const { BasicStrategy }= require('passport-http')
const bcryp = require('bcrypt')
const boom = require('@hapi/boom')

//const store = require('../components/store')
const Model = require('../store/models/user')


passport.use(
    new BasicStrategy(async ( email, password, cb) => {
        try{
            const user = await Model.find({email: email})

            
            if(!user){
                return cb(boom.unauthorized(), false)
            }
            
            if(!(await bcryp.compare(password, user[0].password))){
                return cb(boom.unauthorized(), false)
            }
            

            delete user.password

            return cb(null, user)
        }catch(error){
            return cb(error)
        }
    })
)