import express from 'express';
import { createFaculty, facultyMulter, findFacultyById, getFaculty } from '../controllers/faculty.controll.js';
const facultyRoute =  express.Router();


facultyRoute.get("/faculty", getFaculty);
facultyRoute.post("/createFaculty",facultyMulter.single('facultyProfile'), createFaculty);
facultyRoute.get("/findFaculty/:id", findFacultyById)

export default facultyRoute;
