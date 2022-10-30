import express , { Request , Response , NextFunction , Errback} from "express";
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import { NotFound } from "http-errors";
import { router } from "./routes/router";

export class Application {
    private app = express()

    constructor() {
        this.configServer()
        this.initMongoose()
        this.errorHandling()
    }

    configServer() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.urlencoded({extended : true}))
        this.app.use(express.static(path.join(__dirname , 'public')))
        this.app.use(router)

        this.app.listen(+(process.env.PORT as string) , () => console.log(`server running on localhost:${process.env.PORT}`))
    }
    initMongoose() {
        mongoose.connect(process.env.MONGODB_URL as string , (err) => {
            if(!err) return console.log('connected to mongodb successfully')
            console.log('faild to connect mongodb')
        })

        process.on('SIGINT' , () => {
            mongoose.connection.close(true)
        })
    }
    errorHandling() {
        this.app.use((req , res , next) => {
            next(NotFound('page not found'))
        })
        this.app.use((error: any, req : Request , res : Response , next : NextFunction) => {
            const errorStatusCode : number = error.statusCode || 500
            const errorMessage : string = error.message || 'Internal server error'

            res.status(errorStatusCode).send({
                statusCode : errorStatusCode,
                message : errorMessage
            })
        })
    }
}

