import { Request,Response } from "express";
import bcrypt from "bcryptjs"
import User,{IUser} from "../models/usermodel";
export const registerUser=async(name:string,email:string,password:string)=>{
        const existingUser= await User.findOne({email})
        if(existingUser){
            throw new Error("User already Exists")
        }
        const salt=await bcrypt.genSalt(10)
        console.log(salt)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=await User.create({name,email,password:hashedPassword})
        newUser.save()
        return newUser
}
export const loginUser=async(email:string,password:string)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error("Invalid Credentials")
    }
    const isMatch=await bcrypt.compare(password,user.password as string)
    if(!isMatch){
        throw new Error("Invalid Credentials")
    }
    return user 
}
