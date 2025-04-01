import express from "express" ;
import jwt from "jsonwebtoken" ;
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {Request, Response} from "express";
import {createUserSchema, roomSchema, signInSchema} from "@repo/common/types"
const app = express() ;
import {prismaclient} from "@repo/db/client"

app.use(express.json()) ;
app.get("/signup",(req,res)=>{
    console.log("hello") ;
    res.json({
        "message":"hello"
    })
})


 app.post("/signup",async(req,res)=>{

    const parsedData = createUserSchema.safeParse(req.body) ;
    if(!parsedData.success){
        console.log(parsedData) ;
        res.json({
            message:"wrong input , zod error"
        })
        return ;
    }

    try {
         const user = await prismaclient.user.create({

            data:{
                    email:  parsedData.data.username,
                    //using bcrypt to hash the password
                    password: parsedData.data.password,
                    name:   parsedData.data.name
                }
            })
            res.json({
                message: user.id
            })
            
        } catch (error) {
            res.status(411).json({
                message:"User Exist already."
            })
        }   
 })



 app.post("/signin", async(req,res)=>{
    const parsedData = signInSchema.safeParse(req.body) ;

    if(!parsedData.success) {
        res.json({
            message:"Incorrect Inputs."
        })
    }

    const user = await prismaclient.user.findFirst({
        data:{
            email: parsedData.data?.username,
            password: parsedData.data?.password

        }
    })

    
    if(!user){
        res.json({
            message: "Authentication failed."
        })
    
    }

    const token = jwt.sign({
        userId: user.id
    },JWT_SECRET)

    res.json({
        token: token 
    })
 })

 app.post("/room", middleware,async (req:Request,res:Response)=>{
    //db call
    const parsedData = roomSchema.safeParse(req.body) ;

    if(!parsedData.success){
        res.json({
            message: "Error in room creation."
        })
    }
    //@ts-ignore
    const userId = req.userId ;

   try {
    const newRoom = await prismaclient.room.create({
        data : {
            slug: parsedData.data?.name,
            adminId: userId

        }
    })
    
    if(newRoom){
        res.json({
            roomId : newRoom.id
        })
    }
   } catch (error) {
        console.log(error) ;
   } 
       
 })



 app.listen(3001)

