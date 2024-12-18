import multer from "multer";
import handleError from "../errors/handle.error.js";
import adminModel from "../model/admin.model.js";
// import adminModel from "../model/admin.model.js";
import studentModel from "../model/student.model.js"



import path from 'path';
const facultyDirPath =  path.join("public/student");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(
      null,
      facultyDirPath
    );
  },

  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

export const facultyMulter = multer({ storage: storage });

export const createStudent =  async(req, res)=>{
const adminId =  req.params.adminid;
const {studentName, studentEmail, studentMobile, studentPassword, admin_id} =  req.body;
const studentProfile =  req.file;

if(!adminId)
    return handleError(res, 400, "admin id not found");

const verifyId =  await adminModel.findById(adminId);

if(!verifyId)
    return handleError(res, 400, 'invalid admin id')


try{

const saveData =  new studentModel({
    studentName:studentName, 
    studentEmail:studentEmail,
    studentMobile:studentMobile,
    studentPassword:studentPassword,
    adminID:admin_id,
    studentProfile:studentProfile.filename
      
});
if(saveData){
    const data = await saveData.save();
   return handleError(res, 201, "success", data);
}
}catch(e){
    return handleError(res, 500, "internal server error");
}

}


