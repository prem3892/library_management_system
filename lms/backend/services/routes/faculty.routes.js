import express from 'express';
import { createFaculty, deleteAllFaculty,  deleteFacultyById, facultyMulter, findFacultyById, getFaculty, loginFaculty, refresh } from '../controllers/faculty.controll.js';
import verificationRoute from '../mail/emailroute.js';
import verifyToken from '../middleware/protect.route.token.js';
const facultyRoute =  express.Router();



// Apply verifyToken middleware to all routes except /login
// facultyRoute.use(verifyToken);

// Exclude verifyToken middleware for /login route
// facultyRoute.post("/login", [loginFaculty]);

facultyRoute.get("/admin/:adminid/faculty",verifyToken, getFaculty);
facultyRoute.post("/admin/:id/createFaculty/",facultyMulter.single('facultyProfile'), createFaculty);
facultyRoute.post("/login", loginFaculty);
facultyRoute.get("/admin/:adminId/findFaculty/:facultyId", findFacultyById);
facultyRoute.delete("/admin/:adminid/deletefaculty/:facultyid", deleteFacultyById);
facultyRoute.delete("/:adminID/deleteallfaculty", deleteAllFaculty);
facultyRoute.get("/mail-verification", verificationRoute);

facultyRoute.post("/refresh", refresh);
export default facultyRoute;
