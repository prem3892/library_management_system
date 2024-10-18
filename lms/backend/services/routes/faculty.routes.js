import express from 'express';
import { createFaculty, deleteAllFaculty, deleteFaculty, facultyMulter, findFacultyById, getFaculty } from '../controllers/faculty.controll.js';
const facultyRoute =  express.Router();


facultyRoute.get("/faculty", getFaculty);
facultyRoute.post("/createFaculty",facultyMulter.single('facultyProfile'), createFaculty);
facultyRoute.get("/findFaculty/:id", findFacultyById);
facultyRoute.delete("/facultydelete/:id", deleteFaculty);
facultyRoute.delete("/deleteallfaculty", deleteAllFaculty)

export default facultyRoute;
