import express from 'express'
import {addTrain,getAvailability} from '../contollers/train.controller.js'
import {adminAuthMiddleware} from '../middleware/protectedRoutes.js'
const router=express.Router();

router.post('/add',adminAuthMiddleware,addTrain).get('/availability',getAvailability);
export default router;