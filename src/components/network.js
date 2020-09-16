const express = require('express')
const router = express.Router()
const response = require('../network/response')
const controller = require('./controller')

router.get('/', async (req, res) => {
    try{
        const result = await controller.get()
        response.success(req, res, result, 201)
    }catch(error){
        response.error(req, res, error.message, 400, error)
    } 
})

module.exports = router