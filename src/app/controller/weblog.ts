import { NextFunction, Request, Response } from "express"
import { weblogModel } from "../models/weblog"
import { CreateWeblogBody, UpdateWeblogBody } from "../types/weblog"
import { createWeblogValidationSchema, updateWeblogValidationSchema, validateObjectId } from "../validation/weblog"
import httpStatusCode from 'http-status-codes'
import mongoose from "mongoose"
import createHttpError from "http-errors"


class WeblogController {
    async createWeblog(req : Request , res : Response , next : NextFunction) {
        try {
            const userId = req.headers.userId as string
            await createWeblogValidationSchema.validateAsync(req.body)
            const data : CreateWeblogBody = req.body

            data.media = req.file ? req.file.path.split('public')[1].replace('\\' , '/') : null
            data._id = req.params.weblogId

            const weblog = await weblogModel.create({...data , author : userId})
            
            res.status(httpStatusCode.CREATED).send({
                statusCode : httpStatusCode.CREATED,
                message : '',
                data : {
                    weblog
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateWeblog(req : Request , res : Response , next : NextFunction) {
        try {
            await updateWeblogValidationSchema.validateAsync(req.body)
            
            const data : UpdateWeblogBody = req.body
            data.media = req.file ? req.file.path.split('public')[1].replace('\\' , '/') : null

            const {weblogId} = req.params

            const updateWeblog = await weblogModel.updateOne({_id : weblogId} , data)

            res.status(httpStatusCode.OK).send({
                statusCode : httpStatusCode.OK,
                message : 'weblog updated successfully',
                data : {}
            })

        } catch (error) {
            next(error)
        }
    }
    async deleteWeblog(req : Request , res : Response , next : NextFunction) {
        try {
            const deleteWeblog = await weblogModel.deleteOne({_id : req.params.weblogId})

            res.status(httpStatusCode.OK).send({
                statusCode : httpStatusCode.OK,
                message : 'weblog deleted successfully',
                data : {}
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllWeblogs(req : Request , res : Response , next : NextFunction) {
        try {
            const {page , limit , searchText , createdAt , title} = req.query
            const search = searchText ? {$text : {$search : (searchText as string)}} : {}

            const weblogs = await weblogModel.aggregate([
                {
                    $match : search
                },
                {
                    $skip : ((+page || 1) - 1) * (+limit || 20)
                },
                {
                    $limit : +limit || 20
                },
                {
                    $sort : createdAt ? {createdAt : (+createdAt === 1 ? +1 : -1)} : {title : (+title === 1 ? +1 : -1)}
                },
                {
                    $project : {
                        text : 0
                    }
                }
            ])

            res.status(httpStatusCode.OK).send({
                statusCode : httpStatusCode.OK,
                message : '',
                data : {
                    weblogs
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getWeblogById(req : Request , res : Response , next : NextFunction) {
        try {
            const {weblogId} = req.params
            validateObjectId(weblogId)

            const [weblog] = await weblogModel.aggregate([
                {
                    $match : {_id : new mongoose.Types.ObjectId(weblogId)}
                },
                {
                    $lookup : {
                        from : 'users',
                        localField : 'author',
                        foreignField : '_id',
                        as : 'author'
                    }
                },
                {
                    $unwind : '$author'
                },
                {
                    $project : {
                        'author.password' : 0
                    }
                }
            ])

            res.status(httpStatusCode.OK).send({
                statusCode : httpStatusCode.OK,
                message : '',
                data : {
                    weblog
                }
            })

        } catch (error) {
            next(error)
        }
    }
}

export default new WeblogController()