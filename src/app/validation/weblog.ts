import createHttpError from 'http-errors'
import joi from 'joi'
import mongoose from 'mongoose'

export const createWeblogValidationSchema = joi.object({
    title : joi.string().required(),
    text : joi.string().required()
})

export const updateWeblogValidationSchema = joi.object({
    title : joi.string(),
    text : joi.string()
})

export const validateObjectId = (id : string) => {
    const check = mongoose.Types.ObjectId.isValid(id)

    if(!check) throw new createHttpError.BadRequest('please inter a valid id')
}