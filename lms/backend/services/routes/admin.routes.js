import express from 'express';
import { getAdmin } from '../controllers/admin.controll.js';
const adminRoute =  express.Router();


adminRoute.get("/admin", getAdmin);

export default adminRoute;