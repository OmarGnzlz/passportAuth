require('dotenv').config()

const config = {
    port: process.env.PORT,
    db_uri: process.env.DB_URI,
    jwt_secret: process.env.AUTH_JWT_SECRET
}

module.exports = config