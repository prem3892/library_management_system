import express from 'express';
import { courseMulter, createCourseByFaculty, getCourse, getCourseByFaculty } from '../controllers/course.controll.js';
const courseRoute =  express.Router();


courseRoute.get("/getCourse", getCourse)
courseRoute.get("/faculty/:id/courses", getCourseByFaculty);
courseRoute.post("/faculty/:id/courses", courseMulter.single('coursePdf'), createCourseByFaculty);


export default courseRoute;


