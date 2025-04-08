import session from "express-session"
import mongoStore from "connect-mongo"
import dotenv from "dotenv"
dotenv.config()
const key=process.env.SECRET_KEY as string
console.log(key)
const createSession=session({
    secret:key,
    resave:false,
    saveUninitialized:false,
    store:mongoStore.create({
        mongoUrl:process.env.CONNECTION_STRING,
        collectionName:"sessions"
    }),
    cookie:{
        secure:false,
        maxAge:1000 * 30 * 1
    }
})
export default createSession