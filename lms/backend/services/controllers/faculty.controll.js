import handleError from "../errors/handle.error.js"
import multer from 'multer';
import FacultyModel from "../model/faculty.model.js";
import courseModel from "../model/course.model.js";
import adminModel from "../model/admin.model.js";



const storage =  multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, "/Users/premr/Desktop/library_management_system/library_management_system/lms/backend/public/faculty")
    },
    
    filename: (req, file, cb) => {
        return cb(null, file.originalname);
    }
})

export const facultyMulter =  multer({storage: storage})


// ! get all the faculties  by admin

export const getFaculty =   async(req, res)=>{
    const {adminid} =  req.params;
    if(!adminid){
        return handleError(res, 400, "Please provide admin ID");
    }
    
    const validateAdminId =  await adminModel.findById(adminid);
    if(!validateAdminId){
        return handleError(res, 400, "Admin not found");
    }else{
            try{    
                const getFaculty = await FacultyModel.find({adminID: validateAdminId});
                if(getFaculty){
                    return handleError(res, 200, "Faculty found", getFaculty)
                }else{
                    return handleError(res, 400, "Faculty not found");
                }
            }catch(e){
                handleError(res, 500, e.message);
            }
        }
   
    }


// ! create faculty
export const createFaculty =  async(req, res)=>{
    const {facultyName, email, mobile, password, adminID} =  req.body;
    const facultyProfile =  req.file;
    const id =  req.params.id;

    if(!id){
        return handleError(res, 400, "Please provide admin ID");
    }

    const adminid =  await adminModel.findById(id);
    if(!adminid){
        return handleError(res, 400, "Admin not found");
    }

    if(adminid._id.toString() !== adminID){
        return handleError(res, 401, "Admin id does not match");
    }
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
                    facultyProfile: facultyProfile.filename,
                    adminID: id
                
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


// ! find  faculty by admin id and faculty id
export const findFacultyById = async (req, res) => {
    const adminId = req.params.adminId; 
    const facultyId = req.params.facultyId;

    try {
        // Check if admin exists
        const admin = await adminModel.findById(adminId);
        if (!admin) {
            return handleError(res, 404, "Admin not found");
        }

        const faculty = await FacultyModel.findOne({ _id: facultyId, adminID: adminId });
        if (!faculty) {
            return handleError(res, 404, "Faculty not found or does not belong to this admin");
        }

        return res.status(200).json({ message: "Faculty found", faculty });
    } catch (error) {
        handleError(res, 500, error.message);
    }
};


// ! delete faculty and associated courses

export const deleteFacultyById =  async(req, res)=>{
    const {adminid} =  req.params;
    const {facultyid} =  req.params;

    if(!adminid){
        return handleError(res, 400, "Please provide admin ID");
    }
    
    const validateAdminId =  await adminModel.findById(adminid);
    if(!validateAdminId){
        return handleError(res, 400, "Invalid admin ID provided");
    }
    if(!facultyid){
        return handleError(res, 400, "Please provide faculty ID");
    }
    
    const validateFacultyId =  await FacultyModel.findById(facultyid);
    if(!validateFacultyId){
        return handleError(res, 404, "Invalid faculty ID provided");
    }

    try{

            const facultyId =  await FacultyModel.findByIdAndDelete(validateFacultyId);
            if(facultyId){
                const deleteCoursesAssociated =  await courseModel.deleteMany({courseId: validateFacultyId});

                if(deleteCoursesAssociated){
                    return handleError(res, 200, "Faculty and associated courses deleted successfully", facultyId, deleteCoursesAssociated);
                }else{
                    return handleError(res, 400, "cannot delete courses and faculty and associated courses");
                }

            }else{
                return handleError(res, 400, "Faculty not deleted");
            }
    }catch (e){
        handleError(res, 500, e.message);
    }

}

// ! delete all faculty 
export const deleteAllFaculty = async(req, res)=>{
    try{
        const deleteAllFaculties = await FacultyModel.deleteMany();
        if(deleteAllFaculties){
            return handleError(res, 200, "All faculties deleted successfully");
        }else{
            return handleError(res, 400, "cannot delete faculties");
        }
    }catch(e){
        return handleError(res, 500, e.message);
    }
}
