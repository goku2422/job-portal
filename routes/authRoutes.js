import express from 'express';
import { loginController, registerController } from '../controller/authcontroller.js';
import userAuth from '../middleware/auth.middleware.js';
 

//routes object 
const router = express.Router();

//routes registration//post
router.post('/register',   registerController)


//login // post
router.post('/login',  loginController)

//export
export default router;