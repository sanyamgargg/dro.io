import express from "express" ;
import jwt from "jsonwebtoken" ;
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {Request, Response} from "express";
import {createUserSchema} from "@repo/common/types"
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



 app.post("/signin",(req,res)=>{
    const {username,password} = req.body ;

    const userId = 1 ;
    if(userId){
        const token = jwt.sign({
            userId
        },JWT_SECRET)

        res.json({
            token: token 
        })
    }else{
        res.json({
            message: "user doesnt exist."
        })
    }




 })
 app.post("/room", middleware, (req:Request,res:Response)=>{
    //db call
    res.json({
        roomid: 123
    })
    


 })
 app.listen(3001)

