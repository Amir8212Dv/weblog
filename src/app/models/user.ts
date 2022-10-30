import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username : {type : String , required : true , unique : true},
    password : {type : String , required : true}
} , {
    id : false,
    timestamps : true
})

export const userModel = mongoose.model('user' , userSchema)