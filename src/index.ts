import express from "express";
import connectDB from "./config/db";
import sessionMiddleware from "./config/session";
import authRoutes from "./routes/userRoutes";
connectDB()
const port=process.env.PORT;
const app=express();
app.use(express.json());
app.use(sessionMiddleware);
app.use("/auth",authRoutes);
app.listen(port,()=>{
  console.log(`Server running on port:${port}`);
});
//securepassword