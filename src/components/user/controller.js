const store = require('./store')
const bcrypt = require('bcrypt')


const getUser = async () => {
    let result = await store.getall()
    return result
}

const createUser = async (name, username, email, password) => {
    if(!name || !username || !email || !password){
        throw new Error("Missing Data")
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = {
        name,
        username,
        email,
        password: hashedPassword
    }
    

    const newUser = await store.add(user)
    return newUser
    
}

const updateUser = async (id, name, username, email, password) => {
    try {
        if(!id || !name || !username || !email || !password){
            throw new Error("Missing Data")
        }
    
    const hashedPassword = await bcrypt.hash(password, 8)
    
    const user = {
        name,
        username,
        email, 
        password: hashedPassword
    }
        const updatedUser = await store.update(id, user)
        
        const finalResponse = {
            user,
            "System Message":"User successfully updated"
        }

        return finalResponse
    } catch (error) {
        throw new Error(error)
    }
}


const deleteUser = async (id) => {
    try {
       if(!id){
           throw new Error("Missin data")
       }

       const user =  await store.remove(id)
       return user
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
}