import { Router } from "express";
import { authorization } from "../middleware/authorization";
import { upload } from "../middleware/multer";
import WeblogController from '../controller/weblog'
import { checkUserAccessForWeblog } from "../middleware/checkUserAccess";

export const weblogRoutes = Router()

weblogRoutes.post('/create', authorization, upload.single('image'), WeblogController.createWeblog)
weblogRoutes.patch('/update/:weblogId', authorization, checkUserAccessForWeblog, upload.single('image'), WeblogController.updateWeblog)
weblogRoutes.delete('/delete/:weblogId', authorization, checkUserAccessForWeblog, WeblogController.deleteWeblog)
weblogRoutes.get('/all', WeblogController.getAllWeblogs)
weblogRoutes.get('/:weblogId', WeblogController.getWeblogById)