import joi from 'joi'

export const userValidationSchema = joi.object({
    username : joi.string().required().min(3),
    password : joi.string().required().min(6)
})