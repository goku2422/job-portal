import express from 'express';
import { testPostController } from '../controller/testcontroller.js';
import userAuth from '../middleware/auth.middleware.js';

const router = express.Router();


//routes

router.post('/test-post', userAuth, testPostController)

 
export default router; 