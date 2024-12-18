import handleError from "../errors/handle.error.js";
import multer from "multer";
import FacultyModel from "../model/faculty.model.js";
import courseModel from "../model/course.model.js";
import adminModel from "../model/admin.model.js";
import sendVerification from "../mail/mailVarification.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import verificationRoute from "../mail/emailroute.js";

const facultyDirPath =  path.join("public/faculty");
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

// ! get all the faculties  by admin

export const getFaculty = async (req, res) => {
  const { adminid } = req.params;
  if (!adminid) {
    return handleError(res, 400, "Please provide admin ID");
  }

  const validateAdminId = await adminModel.findById(adminid);
  if (!validateAdminId) {
    return handleError(res, 400, "Faculty not found");
  } else {
    try {
      const getFaculty = await FacultyModel.find({ adminID: validateAdminId });
      if (getFaculty) {
        return handleError(res, 200, "Faculty found", {getFaculty:getFaculty});
      } else {
        return handleError(res, 400, "Faculty not found");
      }
    } catch (e) {
      return handleError(res, 500, e.message);
    }
  }
};




// ! create faculty

export const createFaculty = async (req, res) => {
 
  const { facultyName, email, mobile, password, adminID } = req.body;
  const facultyProfile = req.file;
  const id = req.params.id;

  if (!id) {
    return handleError(res, 400, "Please provide admin ID");
  }
  const adminid = await adminModel.findById(id);
  if (!adminid) {
    return handleError(res, 400, "Admin not found");
  }

  if (adminid._id.toString() !== adminID) {
    return handleError(res, 401, "Admin id does not match");
  }

  const checkMail = await FacultyModel.findOne({ email: email });
  if (checkMail) {
    return handleError(res, 400, "Email already exists");
  }

  try {
    if (!facultyProfile) {
      return handleError(res, 400, "Please provide faculty profile");
    } else {
      if (facultyName && email && mobile && password) {
        const salt =  await bcrypt.genSalt(12);
        const hashPass =  await bcrypt.hash(password, salt);
        const faculty = new FacultyModel({
          facultyName: facultyName,
          email: email,
          mobile: mobile,
          password: hashPass,
          facultyProfile: facultyProfile.filename,
          adminID: id,
        });
        if (faculty) {
          const msg = `<h2>Hii ${facultyName} Please <a href='http://localhost:8585/mail-verification/?id=${faculty._id}'>Verify</a> Your Mail</h2>`;
          sendVerification(email, "Mail verification", msg);
          // verificationRoute()
          // console.log(120)
          const data = await faculty.save();
          return handleError(res, 201, "Faculty created successfully", data);
        } else {
          return handleError(res, 400, "Faculty not created");
        }
      } else {
        return handleError(res, 400, "All fields are required");
      }
    }
  } catch (e) {
    return handleError(res, 400, e.message);
  }
};



// ! login faculty 
function generateToken(user){
   return jwt.sign({userid:user}, "secret", {expiresIn: "1m"});
}
function generateRefreshToken(user){
  return jwt.sign({userid:user}, "secret", {expiresIn: "5m"});
}

// ! post route refresh token auth

export const refresh =  (req, res)=>{
  const {refreshToken} =  req.cookies;
  if(!refreshToken)

    return handleError(res, 400, "refreshtoken not found")

    jwt.verify(refreshToken, "secret", (err, decode)=>{
      if(err)

        return handleError(res, 400, "invalid token or expired")

        const newToken =  generateToken(decode.userid);
        console.log(decode.userid)
        res.cookie("accessToken", newToken, {httpOnly:true, maxAge:5*60*1000});
        return handleError(res, 200, "token refreshed");
    })
}

// ! login faculty 
export const loginFaculty =  async(req, res)=>{
  const {email, password} =  req.body;
  try{
   
      if(email && password){
          const varify_email =  await FacultyModel.findOne({email: email});
          if(!varify_email){
            return handleError(res, 400, "Email is not registered")
          };
          const  compare_password =  await bcrypt.compare(password,varify_email.password);
          if(!compare_password){
            return handleError(res, 400, "invalid password");
          } 
        

          if(compare_password){
            const token =  generateToken(varify_email._id);
            const refreshToken =  generateRefreshToken(varify_email._id);
            res.cookie("accessToken", token, {httpOnly:true, maxAge: 1 * 60 *1000});
            res.cookie("refreshToken", refreshToken, {httpOnly:true, maxAge: 5 *60*1000});
            return handleError(res, 200, "logged in",varify_email)
          }
      }else{
        return handleError(res, 400, "all fields are required");
      }
  }catch(e){
   return handleError(res, 500, "internal server login error")
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

    const faculty = await FacultyModel.findOne({ _id: facultyId }).populate(
      "adminID"
    );
    if (!faculty) {
      return handleError(
        res,
        404,
        "Faculty not found or does not belong to this admin"
      );
    }
    return handleError(res, 200, "Faculty found", faculty);
  } catch (error) {
    return handleError(res, 500, error.message);
  }
};

// ! delete faculty and associated courses

export const deleteFacultyById = async (req, res) => {
  const { adminid } = req.params;
  const { facultyid } = req.params;

  if (!adminid) {
    return handleError(res, 400, "Please provide admin ID");
  }

  const validateAdminId = await adminModel.findById(adminid);
  if (!validateAdminId) {
    return handleError(res, 400, "Invalid admin ID provided");
  }
  if (!facultyid) {
    return handleError(res, 400, "Please provide faculty ID");
  }

  const validateFacultyId = await FacultyModel.findById(facultyid);
  if (!validateFacultyId) {
    return handleError(res, 404, "Invalid faculty ID provided");
  }

  try {
    const facultyId = await FacultyModel.findByIdAndDelete(validateFacultyId);
    if (facultyId) {
      const deleteCoursesAssociated = await courseModel.deleteMany({
        facultyId: validateFacultyId,
      });

      if (deleteCoursesAssociated) {
        return handleError(
          res,
          200,
          "Faculty and associated courses deleted successfully",
          facultyId,
          deleteCoursesAssociated
        );
      } else {
        return handleError(
          res,
          400,
          "cannot delete courses and faculty and associated courses"
        );
      }
    } else {
      return handleError(res, 400, "Faculty not deleted");
    }
  } catch (e) {
    return handleError(res, 500, e.message);
  }
};

// ! delete all faculty
export const deleteAllFaculty = async (req, res) => {
  
  const {adminID} =  req.params;
  try {
    if(!adminID){
      return handleError(res, 404, "admin id not found");
    }else{
    
      const deleteAllFaculties = await FacultyModel.deleteMany();
      if (deleteAllFaculties) {
        return handleError(res, 200, "All faculties deleted successfully");
      } else {
        return handleError(res, 400, "cannot delete faculties");
      }
    }

  } catch (e) {
    return handleError(res, 500, e.message);
  }
};




// !  reset password


// export const resetPassword = async (req, res) => {
//   const { oldPassword, newPassword, adminID } = req.body;
//   const { id } = req.params; // Faculty ID

//   // Check if all required fields are provided
//   if (!oldPassword || !newPassword) {
//     return handleError(res, 400, "Please provide both old and new passwords");
//   }

//   // Find the faculty by ID
//   const faculty = await FacultyModel.findById(id);
//   if (!faculty) {
//     return handleError(res, 400, "Faculty not found");
//   }

//   // Check if the adminID matches the faculty's adminID
//   if (faculty.adminID.toString() !== adminID) {
//     return handleError(res, 401, "Admin ID does not match");
//   }

//   try {
//     // Compare old password with the stored hashed password
//     const isOldPasswordCorrect = await bcrypt.compare(oldPassword, faculty.password);
//     if (!isOldPasswordCorrect) {
//       return handleError(res, 400, "Old password is incorrect");
//     }

//     // Check if the new password is valid (you can add additional validation here)
//     if (newPassword === oldPassword) {
//       return handleError(res, 400, "New password cannot be the same as the old password");
//     }

//     // Hash the new password
//     const salt = await bcrypt.genSalt(12);
//     const hashedNewPassword = await bcrypt.hash(newPassword, salt);

//     // Update the faculty password
//     faculty.password = hashedNewPassword;

//     // Save the updated faculty record
//     const updatedFaculty = await faculty.save();

//     // Return success response
//     return res.status(200).json({
//       message: "Password reset successfully",
//       faculty: updatedFaculty
//     });
//   } catch (e) {
//     return handleError(res, 400, e.message);
//   }
// };

// !


//! Code Implementation:
//! Step 1: Forgot Password Route (Public Route)
// const crypto = require('crypto');
// const bcrypt = require('bcrypt');
// const FacultyModel = require('../models/FacultyModel'); // Adjust based on your file structure
// const { sendVerification } = require('../utils/sendEmail'); // Adjust based on your file structure
// const { handleError } = require('../utils/errorHandler'); // Adjust based on your file structure

// // Forgot Password: Send email with verification link
// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return handleError(res, 400, "Please provide an email address");
//   }

//   try {
//     const faculty = await FacultyModel.findOne({ email });
//     if (!faculty) {
//       return handleError(res, 400, "No account found with that email address");
//     }

//     // Generate a unique reset token (expires in 1 hour)
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     const resetTokenExpiration = Date.now() + 3600000; // 1 hour

//     // Store the reset token and its expiration date in the database
//     faculty.resetPasswordToken = resetToken;
//     faculty.resetPasswordExpires = resetTokenExpiration;
//     await faculty.save();

//     // Send email with the reset link
//     const resetLink = `http://localhost:8585/api/v1/reset-password/${resetToken}`;
//     const msg = `<h2>Please <a href="${resetLink}">click here</a> to reset your password.</h2>`;

//     // Send verification email
//     sendVerification(email, "Password Reset Request", msg);

//     return res.status(200).json({
//       message: "Password reset link has been sent to your email",
//     });
//   } catch (error) {
//     return handleError(res, 400, error.message);
//   }
// };



//! Step 2: Reset Password Route (Accessible via the Reset Link)
// const bcrypt = require('bcrypt');
// const FacultyModel = require('../models/FacultyModel'); // Adjust based on your file structure
// const { handleError } = require('../utils/errorHandler'); // Adjust based on your file structure

// // Reset Password: User submits a new password along with the reset token
// export const resetPassword = async (req, res) => {
//   const { token } = req.params; // Get token from URL
//   const { newPassword } = req.body; // New password provided by the user

//   if (!newPassword) {
//     return handleError(res, 400, "Please provide a new password");
//   }

//   try {
//     // Find the faculty by the reset token
//     const faculty = await FacultyModel.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() }, // Check if the token is still valid (hasn't expired)
//     });

//     if (!faculty) {
//       return handleError(res, 400, "Invalid or expired token");
//     }

//     // Hash the new password
//     const salt = await bcrypt.genSalt(12);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     // Update the user's password and clear the reset token and expiration
//     faculty.password = hashedPassword;
//     faculty.resetPasswordToken = undefined;
//     faculty.resetPasswordExpires = undefined;
//     await faculty.save();

//     return res.status(200).json({
//       message: "Password has been successfully reset",
//     });
//   } catch (error) {
//     return handleError(res, 400, error.message);
//   }
// };
