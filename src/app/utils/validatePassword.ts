import { compareSync } from "bcrypt"

export const validatePassword = (encryptedPassword : string , password : string) => {
    return compareSync(password , encryptedPassword)
}