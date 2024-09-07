import express from 'express'
import {addTrain,getAvailability,bookTicket} from '../contollers/train.controller.js'
import {adminAuthMiddleware,usermiddleware} from '../middleware/protectedRoutes.js'
const router=express.Router();

router.post('/add',adminAuthMiddleware,addTrain).get('/availability',usermiddleware,getAvailability).post('/book',usermiddleware,bookTicket)
export default router;