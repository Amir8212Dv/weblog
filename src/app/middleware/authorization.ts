import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { userModel } from "../models/user";
import { TokenData } from "../types/user";
import { validateToken } from "../utils/validateToken";


export const authorization = async (req : Request , res : Response , next : NextFunction) => {
    try {
        const authToken = req.headers.authorization
        
        if(!authToken) throw new createHttpError.Unauthorized('please login')
        const [bearer , token] = authToken.split(' ')

        if(bearer.toLowerCase() === 'bearer' && token) {
            const {_id} : TokenData = validateToken(token)

            const user = await userModel.findById(_id)
            if(user) {
                req.headers.userId = _id
                return next()
            }
        }
        throw new createHttpError.Unauthorized('please login')
        
    } catch (error) {
        next(error)
    }
}