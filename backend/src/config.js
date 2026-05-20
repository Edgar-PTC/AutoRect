import dotenv from "dotenv"

dotenv.config();

export const config={
    db:{
        URL: process.env.DB_URL
    },
    server: {
        PORT: process.env.PORT
    },
    jwt: {
        secret: process.env.JWT_SECRET_KEY
    },
    email: {
        user_email: process.env.SENDER_EMAIL,
        user_password: process.env.SENDER_PASSWORD
    },
    app: {
        frontend_url: process.env.FRONTEND_URL
    }
}