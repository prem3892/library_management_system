

import multer from "multer";
import path from 'path';
import handleError from "../errors/handle.error.js";

const facultyDirPath =  path.join("public/faculty");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, facultyDirPath); 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); 
    },
  });

  export const facultyMulter = multer({
    storage
  }).single("facultyProfile"); 
  

  export const uploadFacultyMiddleware = (req, res, next) => {
    facultyMulter(req, res, (err) => {
        if(err && err.field !== "facultyProfile"){
            console.log(err.field)
            return handleError(res, 500, "Invalid Field Name");
        }
        next(); 
      });
  };

