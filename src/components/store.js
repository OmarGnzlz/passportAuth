const model = require('../store/models/user')

let dummyDB = [ 1, 2, 3]

const get = async() => {
    return dummyDB
}

const add = async (user) => {
    return dummyDB.push(user)
}

module.exports = {
    get,
    add
}