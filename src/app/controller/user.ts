import { Request , Response , NextFunction } from "express";
import { userModel } from "../models/user";
import {  UserData } from "../types/user";
import { encryptPassword } from "../utils/encryptPassword";
import httpStatusCode from 'http-status-codes'
import { createToken } from "../utils/createToken";
import { userValidationSchema } from "../validation/user";
import { validatePassword } from "../utils/validatePassword";
import createHttpError from "http-errors";

class UserController {
    async createAccount(req : Request , res : Response , next : NextFunction) {
        try {
            await userValidationSchema.validateAsync(req.body)
            const data : UserData = req.body

            data.password = encryptPassword(data.password)


            const user = await userModel.create(data)

            const token = createToken(user._id.toString())

            res.status(httpStatusCode.CREATED).send({
                statusCode : httpStatusCode.CREATED,
                message : 'user account created successfully',
                data : {
                    AuthToken : token
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async login(req : Request , res : Response , next : NextFunction) {
        try {
            await userValidationSchema.validateAsync(req.body)
            const data : UserData = req.body
    
            const user = await userModel.findOne({username : data.username})
            if(!user) throw new createHttpError.BadRequest('username or password is wrong')
    
            const checkPassword = validatePassword(user.password , data.password)
            if(!checkPassword) throw new createHttpError.BadRequest('username or password is wrong')
    
            const token = createToken(user._id.toString())
    
            res.status(httpStatusCode.OK).send({
                statusCode : httpStatusCode.OK,
                message : '',
                data : {
                    AuthToken : token
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()