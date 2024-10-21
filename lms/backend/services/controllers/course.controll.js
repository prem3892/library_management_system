import handleError from "../errors/handle.error.js"
import courseModel from "../model/course.model.js"
import multer from 'multer';
import FacultyModel from "../model/faculty.model.js";



const storage =  multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, "/Users/premr/Desktop/library_management_system/library_management_system/lms/backend/public/courses")
    },
    filename: (req, file, cb) => {
        return cb(null, file.originalname);
    }
})

export const courseMulter =  multer({storage: storage});


export const getCourse =  async(req, res)=>{
    try{
        const getCourse = await courseModel.find();
        if(getCourse){
            return handleError(res, 200, getCourse)
        }else{
            return handleError(res, 400, "course not found")
        }
    }catch(e){
        handleError(res, 500, e.message)
    }
}

export const getCourseByFaculty =  async(req, res)=>{
    const id =  req.params.id;
    try{
        const checkFaculty =  await FacultyModel.findById(id);
        if(!checkFaculty){
            return handleError(res, 400, "Faculty not found")
        }
        
        const getCourseByFaculty = await courseModel.find({courseId:id});
        if(getCourseByFaculty){
            return handleError(res, 200, getCourseByFaculty)
        }else{
            return handleError(res, 400, "course not found")
        }
    }catch(e){
        handleError(res, 500, e.message)
    }
}


export const createCourseByFaculty = async(req, res)=>{
    const facultyId = req.params.id;
    const {courseTitle, courseContent, courseId, author} =  req.body;
    const coursePdf =  req.file;
    if(!coursePdf){
        return handleError(res, 400, "Please provide course pdf");
    }

    const faculty = await FacultyModel.findById(facultyId);
    if(!faculty){

        return handleError(res, 400, "Faculty not found")
    }

    try{
        if(courseTitle && courseContent && courseId && author){
            const createCourseByFaculty = courseModel({
                courseTitle: courseTitle,
                courseContent: courseContent,
                courseId: facultyId,
                coursePdf: coursePdf.filename,
                author: author,
               
            });
            if(createCourseByFaculty){
                const saveCourse =  await createCourseByFaculty.save();
                return handleError(res, 201, "Course created successfully", saveCourse)
            }else{
                return handleError(res, 400, "Failed to create course")
            }
        }else{
            return handleError(res, 400, "Please provide course details")
        }
      
  
    }catch(e){
        handleError(res, 500, e.message)
    }
}



// ! delete all courses

export const deleteAllCourses = async(req, res)=>{
    try{
        const deleteAllCoursesQuery = await courseModel.deleteMany();
        if(deleteAllCoursesQuery){
            return handleError(res, 200, "All courses deleted successfully")
        }else{
            return handleError(res, 400, "Failed to delete all courses")
        }
    }catch(e){
      return  handleError(res, 500, e.message)
    }
}