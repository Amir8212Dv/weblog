import mongoose from 'mongoose'

const weblogSchema = new mongoose.Schema({
    title : {type : String , required : true , unique : true},
    text : {type : String , required : true},
    media : {type : [String] , default : []},
    author : {type : mongoose.Types.ObjectId , required : true}
} , {
    id : false,
    timestamps : true
})


export const weblogModel = mongoose.model('weblog' , weblogSchema)