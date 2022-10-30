import { Router } from "express";
import UserController from "../controller/user";


export const userRoutes = Router()

userRoutes.post('/register' , UserController.createAccount)
userRoutes.post('/login' , UserController.login)