import express from 'express';
import { createStudent, facultyMulter } from '../controllers/student.controll.js';
const studentRoute =  express.Router();

studentRoute.post("/admin/:adminid/create-student",facultyMulter.single('studentProfile'), createStudent);

export default studentRoute;