import express from 'express';
import { courseMulter, createCourseByFaculty, deleteAllCourses, getCourse, getCourseByFaculty } from '../controllers/course.controll.js';
const courseRoute =  express.Router();


courseRoute.get("/getCourse", getCourse)
courseRoute.get("/faculty/:id/courses", getCourseByFaculty);
courseRoute.post("/faculty/:id/courses", courseMulter.single('coursePdf'), createCourseByFaculty);
courseRoute.delete("/deleteallcourse", deleteAllCourses);

export default courseRoute;


