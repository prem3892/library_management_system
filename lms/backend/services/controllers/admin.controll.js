import multer from "multer";
import handleError from "../errors/handle.error.js";
import adminModel from "../model/admin.model.js"



// ! multer here  for admin 

const store =  multer.diskStorage({
    destination: (req, file, cb)=>{
      return  cb(null, "/public/admin")
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
    const {} =  req.body;
    try{
        
    }catch(e){
        handleError(res, 500, e.message)
    }
}