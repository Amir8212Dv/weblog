import joi from 'joi'

export const createWeblogValidationSchema = joi.object({
    title : joi.string().required(),
    text : joi.string().required()
})

export const updateWeblogValidationSchema = joi.object({
    title : joi.string(),
    text : joi.string()
})