import express from "express";

import handleError from "../errors/handle.error.js";
import { verificationOtp } from "../controllers/faculty.controll.js";


const forgetRoute = express.Router();


forgetRoute.post("/verifyotp", async (req, res) => {
    const { facultyEmail, otp } = req.body;
    if (!facultyEmail || !otp) {
        return handleError(res, 400, "Please provide both email and OTP");
    }

    try {
        const storedOtpData = verificationOtp[facultyEmail];

        if (!storedOtpData) {
            return handleError(res, 400, "OTP not found or  expired");
        }

        if (Date.now() > storedOtpData.expiresTime) {
            delete verificationOtp[facultyEmail]; 
            return handleError(res, 400, "OTP has expired");
        }

        if (parseInt(otp) !== storedOtpData.otp) {
            return handleError(res, 400, "Invalid OTP");
        }

      
        delete verificationOtp[facultyEmail];
        return res.status(200).json({ message: "OTP verified successfully, proceed to reset password." });

    } catch (e) {
        return handleError(res, 500, "Error verifying OTP", e);
    }
});

export default forgetRoute;






