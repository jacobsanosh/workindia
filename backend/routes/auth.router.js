import express from 'express';
const router=express.Router();
import {login,register} from '../contollers/auth.contoller.js'
router.post('/login',login).post('/register',register);
export default router;