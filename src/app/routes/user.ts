import { Router } from "express";
import UserController from "../controller/user";


export const userRoutes = Router()

userRoutes.use('/create' , UserController.createAccount)
userRoutes.use('/login' , UserController.login)