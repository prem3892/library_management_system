import multer from "multer";
import handleError from "../errors/handle.error.js";
import adminModel from "../model/admin.model.js"



// ! multer here  for admin 

const store =  multer.diskStorage({
    destination: (req, file, cb)=>{
      return  cb(null, "/Users/Prem/OneDrive/Desktop/library_management_system/lms/backend/public/admin")
    },

    filename: (req, file, cb) => {
      return  cb(null, file.originalname);
    }
})

export const adminprofile =  multer({storage: store});

export const getAdmin =  async(req, res)=>{
    try{
        const getAdmin =  await adminModel.find();
        if(getAdmin){
            return handleError(res, 200, "admin found", getAdmin)
        }else{
            return handleError(res, 400, "Admin not found")
        }
    }catch(e){
        handleError(res, 500, e.message)
    }
}



export const createAdmin =  async(req, res)=>{
    const {user, email, password} =  req.body;
    const profile =  req.file;

    try{

        if(user && email && profile && password){
            const adminUser = new adminModel({
                user: user,
                email: email,
                password: password,
                profile: profile.filename
            });

            const saveAdmin =  await adminUser.save();
            if(!saveAdmin){
                handleError(res, 400, "cannot save admin account");
            }else{
                handleError(res, 201, "admin account created successfully", saveAdmin)
            }
        }else{
         return   handleError(res, 400, "all fields are required")
        }
        
    }catch(e){
        handleError(res, 500, e.message)
    }
}