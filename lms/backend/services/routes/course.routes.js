import express from 'express';
import { courseMulter, createCourseByFaculty, deleteAllCourses, deleteCourseByFaculty,
     getCourse, getCourseByFaculty, updateCourseByFacultyid } from '../controllers/course.controll.js';
const courseRoute =  express.Router();


courseRoute.get("/:adminID/getCourse", getCourse);
courseRoute.get("/faculty/:id/courses", getCourseByFaculty);
courseRoute.post("/faculty/:id/add-course", courseMulter.single('coursePdf'), createCourseByFaculty);
courseRoute.delete("/:adminID/deleteallcourse", deleteAllCourses);
courseRoute.delete("/faculty/:id/course-delete/:courseid", deleteCourseByFaculty);
courseRoute.put("/faculty/:fid/update-course/:cid", courseMulter.single("coursePdf"), updateCourseByFacultyid);

export default courseRoute;


