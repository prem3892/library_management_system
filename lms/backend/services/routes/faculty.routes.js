import express from 'express';
import { createFaculty, deleteAllFaculty,  deleteFacultyById, facultyMulter, findFacultyById, getFaculty } from '../controllers/faculty.controll.js';
const facultyRoute =  express.Router();


facultyRoute.get("/admin/:adminid/faculty", getFaculty);
facultyRoute.post("/admin/:id/createFaculty/",facultyMulter.single('facultyProfile'), createFaculty);
facultyRoute.get("/admin/:adminId/findFaculty/:facultyId", findFacultyById);
facultyRoute.delete("/admin/:adminid/deletefaculty/:facultyid", deleteFacultyById);
facultyRoute.delete("/deleteallfaculty", deleteAllFaculty)

export default facultyRoute;
