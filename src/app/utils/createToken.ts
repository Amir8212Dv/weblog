import { sign } from "jsonwebtoken"


export const createToken = (_id : string) => {
    return sign({_id} , process.env.JWT_SECRETE_KEY , {expiresIn : '1d'})
}