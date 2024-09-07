import express from 'express';
const router=express.Router();
import {login} from '../contollers/auth.contoller.js'
router.post('/login',login)
export default router;