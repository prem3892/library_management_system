import handleError from "../errors/handle.error.js";
import FacultyModel from "../model/faculty.model.js";
import courseModel from "../model/course.model.js";
import adminModel from "../model/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        return handleError(res, 200, "Faculty found", {
          getFaculty: getFaculty,
        });
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
  const { facultyName, facultyEmail, facultyMobile, facultyPassword, adminID } =
    req.body;
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


  const checkMail = await FacultyModel.findOne({ facultyEmail });

  if (checkMail && !checkMail.verified) {
    await FacultyModel.deleteOne({ facultyEmail });
  }


  if (checkMail &&  checkMail.verified) {
    return handleError(res, 400, "Email Already exist or  Verified");
  }

  

  try {
    if (!facultyProfile) {
      return handleError(res, 400, "Please provide faculty profile");
    } else {
      if (facultyName && facultyEmail && facultyMobile && facultyPassword) {
        const salt = await bcrypt.genSalt(12);
        const hashPass = await bcrypt.hash(facultyPassword, salt);
        const faculty = new FacultyModel({
          facultyName: facultyName,
          facultyEmail: facultyEmail,
          facultyMobile: facultyMobile,
          facultyPassword: hashPass,
          facultyProfile: facultyProfile.filename,
          adminID: id,
        });
        if (faculty) {
            // faculty.data =  "hello"
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

function generateToken(user) {
  return jwt.sign({ userid: user }, "secret", { expiresIn: "1m" });
}
function generateRefreshToken(user) {
  return jwt.sign({ userid: user }, "secret", { expiresIn: "5m" });
}

// ! post route refresh token auth
export const refresh = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return handleError(res, 400, "refreshtoken not found");

  jwt.verify(refreshToken, "secret", (err, decode) => {
    if (err) return handleError(res, 400, "invalid token or expired");

    const newToken = generateToken(decode.userid);
    console.log(decode.userid);
    res.cookie("accessToken", newToken, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
      secure:false
    });
    return handleError(res, 200, "token refreshed");
  });
};

// ! login faculty
export const loginFaculty = async (req, res) => {
  const { facultyEmail, facultyPassword } = req.body;
  try {
    if (facultyEmail && facultyPassword) {
      const varify_email = await FacultyModel.findOne({ facultyEmail });
      if (!varify_email) {
        return handleError(res, 400, "Email is not registered");
      }

          if(!varify_email.verified){
            return handleError(res, 400, "please verify your email first or register again")
          }

      const compare_password = await bcrypt.compare(
        facultyPassword,
        varify_email.facultyPassword
      );
      if (!compare_password) {
        return handleError(res, 400, "Invalid password");
      }

      if (compare_password) {
        const token = generateToken(varify_email._id);
        const refreshToken = generateRefreshToken(varify_email._id);
        res.cookie("accessToken", token, {
          httpOnly: true,
          maxAge: 1 * 60 * 1000,
          
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 5 * 60 * 1000,          
        });   
        return handleError(res, 200, "Logged in", varify_email, token);
      }
    } else {
      return handleError(res, 400, "All fields are required");
    }
  } catch (e) {
    return handleError(res, 500, "Internal server login error");
  }
};

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
  const { adminID } = req.params;
  try {
    if (!adminID) {
      return handleError(res, 404, "admin id not found");
    } else {
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
export const resetPassword =  async(req, res)=>{
  const {oldPassword, newPassword} =  req.body;
  const {fid} = req.params;
  
  if(!fid){
    return handleError(res, 400, "invalid faculty param")
  }

    if(!oldPassword || !newPassword){
      return handleError(res, 400, "all fields are required")
    }
  try{
      const checkFid =  await FacultyModel.findById(fid);
        if(!checkFid){
          return handleError(res, 400, "invalid faculty or not found")
        }
        const facultyPassword =  checkFid.facultyPassword
        const compareOldPassword =  await bcrypt.compare(oldPassword,facultyPassword);
        if(!compareOldPassword){
          return handleError(res, 400, "invalid old password");
        }
        if(oldPassword ===newPassword){
          return handleError(res, 400, "old password and new password cannot be the same")
        }
        const salt =  await bcrypt.genSalt(12);
        const hashedNewPassword =  await bcrypt.hash(newPassword, salt)
        const user =  await FacultyModel.findByIdAndUpdate(fid, {$set:{facultyPassword:hashedNewPassword}}, {new:true})
        if(user){
          return handleError(res, 200, "Password updated successfully")
        }else
        {
          return handleError(res, 400, "unable to update password")
        }
  }catch(e){
    return handleError(res, 500, "reset password error", e)
  }
}



const randomNumber = Math.floor(Math.random() * 9000) + 1000;
console.log(randomNumber);


// ! public
export const forgotPassword =  async(req, res)=>{
    const {facultyEmail} =  req.body;
    if(!facultyEmail){
      return handleError(res, 400, "please enter email");
    }
    try{
      // const crypto = require("crypto");
// const randomBytes = crypto.randomBytes(2); // 2 bytes = 16 bits
// const random4Digit = (parseInt(randomBytes.toString("hex"), 16) % 9000) + 1000;

//   console.log(random4Digit);






        const verifyEmail =  await FacultyModel.findOne({facultyEmail});
        if(!verifyEmail){
          return handleError(res, 400, "email is not found")
        }


    }catch(e){
      return handleError(res, 500, "forgot error", e)
    }


}

