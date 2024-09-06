import express from 'express';
import dotenv from 'dotenv';


dotenv.config();
const port=process.env.PORT||3000;

const app=express();
// setting middlewares
app.use(express.json());

// setting routes


app.get('/',(req,res)=>{
    res.send('Hello World');
});
// for user login
app.listen(port,()=>{
    
    console.log(`Server is running on port ${port}`);
});