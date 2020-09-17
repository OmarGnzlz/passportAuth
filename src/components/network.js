const express = require('express')
const router = express.Router()
const response = require('../network/response')
const controller = require('./controller')

router.get('/', async (req, res) => {
    try{
        const result = await controller.getUser()
        response.success(req, res, result, 201)
    }catch(error){
        response.error(req, res, error.message, 400, error)
    } 
})

router.post('/sign', async (req, res) => {
    const { name, username ,email, password } = req.body
    try {
      const user = await controller.createUser(name, username, email,  password)
      response.success(req, res, user, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
  })

module.exports = router