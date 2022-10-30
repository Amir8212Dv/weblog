import { verify } from "jsonwebtoken"
import { TokenData } from "../types/user"


export const validateToken = (token : string) : TokenData => {
    return verify(token , process.env.JWT_SECRETE_KEY) as TokenData
}