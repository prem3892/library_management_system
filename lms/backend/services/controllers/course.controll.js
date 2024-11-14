import handleError from "../errors/handle.error.js"
import courseModel from "../model/course.model.js"
import multer from 'multer';
import FacultyModel from "../model/faculty.model.js";
import adminModel from "../model/admin.model.js";
import path from 'path';

const courseDirPath =  path.join("public/courses");
const storage =  multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, courseDirPath);
    },
    filename: (req, file, cb) => {
        return cb(null, file.originalname);
    }
})

export const courseMulter =  multer({storage: storage});


// ! get all courses by admin
export const getCourse =  async(req, res)=>{
    const adminID =  req.params.adminID;

    if(!adminID){
        return handleError(res, 404, "adminID not found")
    };

    const verifyID =  await adminModel.findById(adminID)
    if(!verifyID){
        return handleError(res, 404, "invalid admin ID")
    }

    try{
        const getCourse = await courseModel.find().populate("facultyId")
        if(getCourse){
            return handleError(res, 200, getCourse)
        }else{
            return handleError(res, 400, "course not found")
        }
    }catch(e){
        handleError(res, 500, e.message)
    }
}


// ! get course by faculty
export const getCourseByFaculty =  async(req, res)=>{
    const id =  req.params.id;
    try{
        const checkFaculty =  await FacultyModel.findById(id);
        if(!checkFaculty){
            return handleError(res, 400, "Faculty not found")
        }
        
        const getCourseByFaculty = await courseModel.find({facultyId:id}).populate('facultyId')
        if(getCourseByFaculty){
            return handleError(res, 200, getCourseByFaculty)
        }else{
            return handleError(res, 400, "course not found")
        }
    }catch(e){
        handleError(res, 500, e.message)
    }
}


// ! create course by faculty
export const createCourseByFaculty = async(req, res)=>{
    const fId = req.params.id;
    const {courseTitle, courseContent, facultyId, author} =  req.body;
    const coursePdf =  req.file;

    const faculty = await FacultyModel.findById(fId);
    if(!faculty){

        return handleError(res, 400, "Faculty not found")
    }

    if(faculty._id.toString() !== facultyId){
        return handleError(res, 401, "faculty iD dosn't match")
    }

    if(!coursePdf){
        return handleError(res, 400, "Please provide course pdf");
    }
    try{
        if(courseTitle && courseContent && facultyId && author){
            const createCourseByFaculty = new courseModel({
                courseTitle: courseTitle,
                courseContent: courseContent,
                facultyId: facultyId,
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



// ! delete all courses by admin 

export const deleteAllCourses = async(req, res)=>{
    var {adminID} =  req.params;
    if(!adminID){
        return handleError(res, 404, "admin id not found")
    }
    
    const verifyAdminID =  await adminModel.findById(adminID);
    if(!verifyAdminID){
        return handleError(res, 401, "admin id is invalid")
    }
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


// ! delete course by faculty id 
export const deleteCourseByFaculty =  async(req, res)=>{
    const facultyId =  req.params.id;
    const courseId =  req.params.courseid;

    
    if(!facultyId){
        return handleError(res, 404, "faculty not found")
    }

    const checkFacultyId =  await FacultyModel.findById(facultyId);
    if(checkFacultyId._id.toString() !== facultyId.toString()){
        return handleError(res, 401, "invalid faculty id");
    }

    if(!courseId){
        return handleError(res, 404, "course id not found");
    }

    const checkCourseId =  await courseModel.findById(courseId);
    if(!checkCourseId){
        return handleError(res, 404, "invalid course id");
    }


        const matchCourseAndFacultyId =  checkCourseId.facultyId.toString() === facultyId.toString();
        if(!matchCourseAndFacultyId){
            return handleError(res, 400, "faculty not associated");
        }

    try{
        if(matchCourseAndFacultyId){    
                const deleteCourseNow =  await courseModel.findByIdAndDelete(checkCourseId);
                if(deleteCourseNow){
                    return handleError(res, 200, "course deleted successfully", deleteCourseNow);
                }else{
                    return handleError(res, 500, "unable to delete course by faculty")
                }
            }    

    }catch(e){
        console.log(e)
    }
}


// ! update course by faculty id 

export const updateCourseByFacultyid =  async(req, res)=>{
    const {courseTitle, courseContent, author, facultyId} =  req.body;
    const {fid} =  req.params;
    const {cid} =  req.params;
    const courseDoc =  req.file;

    if(!courseDoc){
        return handleError(res, 400, "course pdf fields not found")
    }
    if(typeof fid !== 'string' || fid.length !== 24){
        return handleError(res, 400, "invalid length parameter")
    }

    if(courseTitle && courseContent && author && facultyId &&  courseDoc){
        try{
            if(!fid){
                return handleError(res, 404, "faculty id not found");
            }
            const isvalidFaculty = await  FacultyModel.findById(fid);
            if(!isvalidFaculty){
                return handleError(res, 401, "invalid faculty id");
            }

            if(!cid){
                return handleError(res, 404, "course id not found");
            }
            const isvalidCourseId =  await courseModel.findById(cid);
            if(!isvalidCourseId){
                return handleError(res, 401, "invalid course id");
            }

           // Ensure the faculty ID matches the course's faculty
        if (!isvalidCourseId.facultyId.equals(isvalidFaculty._id)) {
            return res.status(401).json({ message: "Faculty ID does not match course faculty" });
        }

        if(fid.toString() !== facultyId.toString()){
            return handleError(res, 401, "faculty not match body")
        }
                
            const updateCourse =  await courseModel.findByIdAndUpdate(cid, {
                courseTitle: courseTitle,
                courseContent: courseContent,
                coursePdf: courseDoc.filename,
                author: author,
                facultyId: facultyId
            }, {new: true});
            if(updateCourse){
                return handleError(res, 200, "course updated successfully", updateCourse);
            }else{
                return handleError(res, 400, "unable to update course")
            }

        }catch(e){
            console.log(e);
        }
    }else{
        return handleError(res, 404, "all fields are required")
    }  
}