import { z } from 'zod'

export const createUserSchema = z.object({
    username: z.string().min(3).max(20) ,
    password: z.string() ,
    name: z.string() 
}) ;

export const signInSchema = z.object({
    username: z.string().min(3).max(20) ,
    password: z.string() ,
})

export const roomSchema = z.object({
    roomId : z.string().min(3).max(20)
})