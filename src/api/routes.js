const user = require('../components/user/network')
const auth = require('../components/auth/auth-network')

const routes = app => {
    app.use('/user', user)
    app.use('/auth', auth)
}

module.exports = routes