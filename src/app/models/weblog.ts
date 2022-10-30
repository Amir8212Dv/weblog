import mongoose from 'mongoose'

const weblogSchema = new mongoose.Schema({
    title : {type : String , required : true , unique : true},
    text : {type : String , required : true},
    media : {type : String , default : null},
    author : {type : mongoose.Types.ObjectId , required : true}
} , {
    id : false,
    timestamps : true,
    versionKey : false
})

weblogSchema.index({title : 'text'})

export const weblogModel = mongoose.model('weblog' , weblogSchema)