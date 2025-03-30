import express from "express" ;
import jwt from "jsonwebtoken" ;
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {Request, Response} from "express";
import {createUserSchema} from "@repo/common/types"
const app = express() ;

app.use(express.json()) ;


 app.get("/signup",(req,res)=>{
    const data = createUserSchema.safeParse(req.body) ;
    if(!data.success){
        res.json({
            message:"wrong input , zod error"
        })

        return ;
    }


    
 })
 app.get("/signin",(req,res)=>{
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
app.listen(3001) ;