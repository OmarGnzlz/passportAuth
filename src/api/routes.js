const user = require('../components/network')

const routes = app => {
    app.use('/user', user)
}

module.exports = routes