import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { weblogModel } from "../models/weblog";


export const checkUserAccessForWeblog = async (req : Request , res : Response , next : NextFunction) => {
    try {
        const {weblogId} = req.params
        const userId = req.headers.userId

        const weblog = await weblogModel.findById(weblogId)
        if(!weblog) throw new createHttpError.NotFound(`weblog with id "${weblogId}" not found`)
        if((weblog.author as mongoose.Types.ObjectId).toString() !== userId) {
            throw new createHttpError.Forbidden('only weblog author can update or delete weblog')
        }
        next()
    } catch (error) {
        next(error)
    }
}