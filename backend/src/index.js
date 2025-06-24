import express from "express";
import cookieparser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
dotenv.config()
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app,server } from "./lib/socket.js";

const PORT = process.env.PORT
const __dirname = path.resolve();
app.use(cookieparser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
 credentials:true
}))

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/vite-project/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend/vite-project/dist/index.html"))
    }
    )
}
server.listen(PORT,()=>{
    console.log("serverr running on port:"+ PORT)
    connectDB()
})
