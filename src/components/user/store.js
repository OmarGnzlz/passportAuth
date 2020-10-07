const Model = require('../../store/models/user')

//let dummyDB = [ 1, 2, 3]

const getall = async() => {
    const user = await Model.find()
    return user
}

const getUser = async(filter) => {
    const user = await Model.find(filter)
}



const add = async (user) => {
    const newUser = new Model(user)
    return newUser.save() 
    //return dummyDB.push(user)
}

const update = async(id, user) => {
    let retrivedUser = await Model.findById({ _id: id })

    let entrie = Object.entries(retrivedUser)
    entrie = Object.entries(user)

    retrivedUser = Object.fromEntries(entrie)

    const updatedUser = await Model.findByIdAndUpdate(id, retrivedUser)
    return updatedUser
}

const remove = async(id) => {
    const userDeleted = await Model.deleteOne({ _id: id })
    return userDeleted
}

module.exports = {
    getall,
    getUser,
    add,
    update,
    remove
}