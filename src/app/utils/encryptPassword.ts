import { hashSync } from "bcrypt"


export const encryptPassword = (password : string) : string => {
    return hashSync(password , 8)
}