import express from 'express';
import { createFaculty, deleteAllFaculty,  deleteFacultyById,  findFacultyById, getFaculty, loginFaculty, refresh } from '../controllers/faculty.controll.js';
import verifyToken from '../middleware/protect.route.token.js';
import sendVerification from '../mail/mailVarification.js';
import {  uploadFacultyMiddleware } from '../multer/upload.single.js';
const facultyRoute =  express.Router();



// Apply verifyToken middleware to all routes except /login
// facultyRoute.use(verifyToken);

// Exclude verifyToken middleware for /login route
// facultyRoute.post("/login", [loginFaculty]);




facultyRoute.get("/admin/:adminid/faculty",verifyToken, getFaculty);
// facultyMulter.fields("facultyDocuments", 5),
// facultyMulter.array("facultyDocuments", 5),
// both are same 
facultyRoute.post("/admin/:id/createFaculty/", uploadFacultyMiddleware,sendVerification, createFaculty);
facultyRoute.post("/login", loginFaculty);
facultyRoute.get("/admin/:adminId/findFaculty/:facultyId", findFacultyById);
facultyRoute.delete("/admin/:adminid/deletefaculty/:facultyid", deleteFacultyById);
facultyRoute.delete("/:adminID/deleteallfaculty", deleteAllFaculty);
facultyRoute.post("/refresh", refresh);

export default facultyRoute;
