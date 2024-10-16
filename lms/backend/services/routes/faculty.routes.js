import express from 'express';
import { createFaculty, facultyMulter, getFaculty } from '../controllers/faculty.controll.js';
const facultyRoute =  express.Router();


facultyRoute.get("/faculty", getFaculty);
facultyRoute.post("/createFaculty",facultyMulter.single('facultyProfile'), createFaculty)

export default facultyRoute;
