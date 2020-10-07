require('dotenv').config()

const config = {
    port: process.env.PORT,
    db_uri: process.env.DB_URI,
    jwt_secret: process.env.AUTH_JWT_SECRET,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET
    
}

module.exports = config