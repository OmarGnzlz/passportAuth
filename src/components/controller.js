const { response } = require('express')
const store = require('./store')

const getUser = async () => {
    let result = await store.get()
    return result
}

const createUser = async (name, username, email, password) => {
    if(!name || !username || !email || !password){
        throw new Error("Missing Data")
    }

    const user = {
        name,
        username,
        email,
        password
    }

    const newUser = await store.add(user)
    return newUser
    
}

module.exports = {
    getUser,
    createUser,
}