import handleError from "../errors/handle.error.js"
import multer from 'multer';
import FacultyModel from "../model/faculty.model.js";



const storage =  multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, "/Users/Prem/OneDrive/Desktop/library_management_system/lms/backend/public/faculty")
    },
    filename: (req, file, cb) => {
        return cb(null, file.originalname);
    }
})

export const facultyMulter =  multer({storage: storage})


// ! get all the faculties 

export const getFaculty =   async(req, res)=>{
    try{    
        const getFaculty = await FacultyModel.find();
        if(getFaculty){
            return handleError(res, 200, "Faculty found", getFaculty)
        }else{
            return handleError(res, 400, "Faculty not found");
        }
    }catch(e){
        handleError(res, 500, e.message);
    }
}


// ! create faculty

export const createFaculty =  async(req, res)=>{
    const {facultyName, email, mobile, password} =  req.body;
    const facultyProfile =  req.file;

    try{
        if(!facultyProfile){
            return handleError(res, 400, "Please provide faculty profile");
        }else {
            if(facultyName && email && mobile && password){
                const faculty = new FacultyModel({
                    facultyName: facultyName,
                    email: email,
                    mobile: mobile,
                    password:  password,
                    facultyProfile: facultyProfile.filename
                });
                if(faculty){
                    await faculty.save();
                    return handleError(res, 201, "Faculty created successfully", faculty)
                }else{
                    return handleError(res,400, "cannot save faculty")
                }
            }else{
                return handleError(res, 400, "All fields are required");
            }
        }
    }catch(e){
        handleError(res, 400, e.message)
    }
}


// ! find  faculty by id 
export const findFacultyById = async(req, res)=>{
    const id =  req.params.id;

    try{
        const faculty = await FacultyModel.findById(id);
        if(!faculty){
            return handleError(res, 400, "Faculty not found");
        }else{
            return handleError(res, 200, "Faculty found", faculty)
        }
    }catch(e){
        return handleError(res, 500, e.message)
    }
}


// ! delete faculty and associated courses
// export const deleteFaculty = async (req, res) => {
//     const id = req.params.id;
//     try {
//         // Check if faculty exists
//         const faculty = await facultyModel.findById(id);
//         if (!faculty) {
//             return handleError(res, 404, "Faculty not found");
//         }

//         // Delete associated courses
//         await courseModel.deleteMany({ courseId: id });

//         // Delete the faculty
//         await facultyModel.findByIdAndDelete(id);
        
//         return handleError(res, 200, "Faculty and associated courses deleted successfully");
//     } catch (e) {
//         handleError(res, 500, e.message);
//     }
// }
