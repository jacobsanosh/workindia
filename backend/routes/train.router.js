import express from 'express'
import {addTrain} from '../contollers/train.controller.js'
const router=express.Router();

router.post('/add',addTrain);
export default router;