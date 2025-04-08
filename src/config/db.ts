import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const C_String=process.env.CONNECTION_STRING as string
console.log(C_String)
const connectDB=async()=>{
    try{
        const connect=await mongoose.connect(C_String)
        console.log("Database Connect Sucessfullyy...")
        console.log("Host Name:",connect.connection.host)
        console.log("DataBase Name:",connect.connection.name)
    }
    catch(err:any){
        console.log("DataBase Not connected..")
        process.exit(1)
    }
}
export default connectDB