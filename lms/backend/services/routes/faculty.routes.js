import express from 'express';
import { createFaculty, deleteAllFaculty,  deleteFacultyById,  findFacultyById, forgotPassword, getFaculty, loginFaculty, refresh, resetPassword } from '../controllers/faculty.controll.js';
import verifyToken from '../middleware/protect.route.token.js';
import sendVerification from '../mail/mailVarification.js';
import {  uploadFacultyMiddleware } from '../multer/upload.single.js';
import FacultyModel from '../model/faculty.model.js';
const facultyRoute =  express.Router();



// Apply verifyToken middleware to all routes except /login
// facultyRoute.use(verifyToken);

// Exclude verifyToken middleware for /login route
// facultyRoute.post("/login", [loginFaculty]);




facultyRoute.get("/admin/:adminid/faculty",verifyToken, getFaculty);
// facultyMulter.fields("facultyDocuments", 5),
// facultyMulter.array("facultyDocuments", 5),
// both are same 
facultyRoute.post("/admin/:id/createFaculty/", uploadFacultyMiddleware,sendVerification, createFaculty);
facultyRoute.post("/login", loginFaculty);
facultyRoute.get("/admin/:adminId/findFaculty/:facultyId", findFacultyById);
facultyRoute.delete("/admin/:adminid/deletefaculty/:facultyid", deleteFacultyById);
facultyRoute.delete("/:adminID/deleteallfaculty", deleteAllFaculty);
facultyRoute.post("/refresh", refresh);
facultyRoute.patch("/resetPassword/:fid", resetPassword);
facultyRoute.post("/forgot-password", forgotPassword)


facultyRoute.get("/link",(req, res)=>{
    res.render("forgot")
} )
// facultyRoute.get("/email",async(req, res)=>{
//     return res.render("email")
          
// })

// facultyRoute.post("/verify", async(req, res)=>{
//     const {facultyEmail} =  req.body;
    
//     const c =  await FacultyModel.findOne({facultyEmail});
  
//         if(c){
//            return res.redirect("/email", {c});

//         }else{
//             return res.redirect("email")
//         }
// })

facultyRoute.get("/email", async (req, res) => {
    return res.render("email", {message:null});
});

facultyRoute.post("/verify", async (req, res) => {
    const { facultyEmail } = req.body;

    
        const faculty = await FacultyModel.findOne({ facultyEmail });

        if (faculty) {
            return res.render("email", { message: "Email found!" });
        } else {
            return res.render("email", { message: "Email not found. Please try again." });
        }
});


export default facultyRoute;
