import nodemailer from "nodemailer";
import "dotenv/config";
import crypto from "crypto";
import handleError from "../errors/handle.error.js";

export const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});


export const verification = {};
// const sendVerification = async (req, res, next) => {
//   const { facultyEmail, facultyName } = req.body;

//   if (!facultyEmail) {
//     return handleError(res, 400, "Email key not found");
//   }
//   const token = crypto.randomBytes(20).toString("hex");
//   verification[facultyEmail] = { token, expires: Date.now() + 60 * 1000 };
//   const link = `<h2>Link Is Valid For 1 Minut</h2> <br /><h2>Hii ${facultyName} Please <a href='http://localhost:8585/verifymail/${facultyEmail}/${token}'>Verify</a> Your Mail</h2>`;
//   try {
//     const info = {
//       from: process.env.SMTP_MAIL,
//       to: facultyEmail,
//       subject: "Mail Verification",
//       html: link,
//     };

//     transport.sendMail(info, (err) => {
//       if (err) {
//         console.log("Error: ", err);
//       }

//       console.log(`Message sent to: ${facultyName}`);
//       next();
//     });
//   } catch (e) {
//     return handleError(res, 500, "internal server mail error");
//   }
// };

// export default sendVerification;
