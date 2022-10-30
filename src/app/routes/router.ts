import { Router } from "express";
import { userRoutes } from "./user";
import { weblogRoutes } from "./weblog";


export const router = Router()

router.use('/user' , userRoutes)
router.use('/weblog' , weblogRoutes)