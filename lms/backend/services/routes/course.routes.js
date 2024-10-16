import express from 'express';
import { getCourse, getCourseByFaculty } from '../controllers/course.controll.js';
const courseRoute =  express.Router();


courseRoute.get("/getCourse", getCourse)
courseRoute.get("/faculty/:id/courses", getCourseByFaculty);
courseRoute.post("/faculty/:id/courses", createCourseByFaculty);


export default courseRoute;


