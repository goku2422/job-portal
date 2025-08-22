//package import

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';    
import cors from 'cors';
//local imports
import connectDB from './config/db.js';

import helmet from 'helmet';

//routes import
import testRoutes from './routes/testRoutes.js';    
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js';
import jobsModels from './models/jobsModels.js';    
import userRoutes from './routes/userRoutes.js';
 



dotenv.config();
//connect DB
connectDB();

//rest object
const app = express();


//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());


//ROUTES
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsModels);


//validation middleware
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is ${process.env.DEV_MODE} running on port ${PORT}`);
}) 