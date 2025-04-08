import { Request,Response } from "express";
import {registerUser,loginUser} from "../services/userServices"
import {IUser} from "../models/usermodel"
export const register=async(req:Request,res:Response)=>{
    try{
        const {name,email,password}=req.body
        const newUser=await registerUser(name,email,password)
        res.status(200).json({message:"User Registered Successfully",User:newUser})
    }
    catch(err:any){
        console.log(err)
        res.status(400).json({message:err.message})
    }
}
export const login=async(req:Request,res:Response)=>{
    try{
        console.log(req.body)
        const {email,password}=req.body
        const user:IUser=await loginUser(email,password)
        if(!req.session){
            throw new Error("Session is not Defined")
        }
        // req.session.user = {
        //     id: user._id.toString(),
        //     // name: user.name,
        //     email: user.email
        // }
        req.session.user=user
        res.json({message:"Login Sucessful",user})
    }
    catch(err:any){
        console.log(err)
        res.status(404).json({message:err.message})
    }
}
export const dashboard=(req:Request,res:Response):void=>
    {
    if(!req.session.user|| !req.session){
        res.status(403).json({ message: "Unauthorized" });
        return
    }
    res.status(200).json({message:"Welcome to Dashboard",user:req.session.user})
}
  
export const logout=(req:Request, res:Response)=>{
    req.session.destroy((err)=>{
      if(err){
        return res.status(500).json({message:"Error logging out"})
      }
      res.json({message:"Logout successful"})
    })
}