import express from "express";
import cookieparser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app,server } from "./lib/socket.js";

const PORT = process.env.PORT
app.use(cookieparser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
 credentials:true
}))
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
server.listen(PORT,()=>{
    console.log("serverr running on port:"+ PORT)
    connectDB()
})