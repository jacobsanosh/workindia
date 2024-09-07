import express from 'express';
import dotenv from 'dotenv';
import {createConnections} from './db/db.js';
import authRouter from './routes/auth.router.js';
import trainRouter from './routes/train.router.js';
dotenv.config();
const port=process.env.PORT||3000;

const app=express();
// setting middlewares
app.use(express.json());

// setting routes


app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use('/auth/',authRouter)
app.use('/train',trainRouter)
// for user login
app.listen(port,()=>{
    createConnections();
    console.log(`Server is running on port ${port}`);
});