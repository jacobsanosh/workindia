import express from 'express';
import dotenv from 'dotenv';
import {createConnections} from './db/db.js';
import authRouter from './routes/auth.router.js';
import trainRouter from './routes/train.router.js';
import cookieParser from 'cookie-parser';
import './models/associations.js'
dotenv.config();
const port=process.env.PORT||3000;

const app=express();
// setting middlewares
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use('/auth/',authRouter)
app.use('/train',trainRouter)

createConnections()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error starting the server:', err);
  });