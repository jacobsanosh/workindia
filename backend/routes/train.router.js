import express from 'express'
import {addTrain} from '../contollers/train.controller.js'
import {adminAuthMiddleware} from '../middleware/protectedRoutes.js'
const router=express.Router();

router.post('/add',adminAuthMiddleware,addTrain);
export default router;