import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import createHttpError from 'http-errors'

const storage = multer.diskStorage({
    destination(req , file , cb) {
        try {
            
            const destinition = path.join(__dirname , '..' , '..' , '..' , 'public' , 'images' , 'weblog')
            fs.mkdirSync(destinition , {recursive : true})
            
            cb(undefined , destinition)
        } catch (error) {
            cb(error , undefined)
        }
    },
    filename(req, file, cb) {
        const _id = req.params.weblogId || new mongoose.Types.ObjectId()
        req.params.weblogId = _id.toString()
        
        cb(undefined , `${_id}.${file.mimetype.split('/')[1]}`)
    },
})

export const upload = multer({storage , limits : {fileSize : 1024 * 1024 * 2} , fileFilter(req, file, cb) {
    const [fileType , fileExtension] = file.mimetype.split('/')
    if(fileType.toLowerCase() !== 'image' && !(['jpg' , 'png' , 'jpeg' , 'webp'].includes(fileExtension.toLowerCase()))) {
        return cb(new createHttpError.BadRequest('file must be an image'))
    }
    cb(undefined , true)
},})