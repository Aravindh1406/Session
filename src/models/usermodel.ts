import mongoose,{Schema,Document}from "mongoose"
export interface IUser extends Document{
    _id: mongoose.Types.ObjectId,
    name:string,
    email:string,
    password:string
}
export const userSchema:Schema=new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})
export default  mongoose.model<IUser>("User",userSchema)

