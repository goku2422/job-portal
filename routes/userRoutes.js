import express from "express";  
import { updateUserController } from "../controller/userController.js";
import userAuth from "../middleware/auth.middleware.js";


//router object
const router = express.Router(); 

//routes

//get 


//put = updates
router.put('/update-user', userAuth, updateUserController)

export default router;