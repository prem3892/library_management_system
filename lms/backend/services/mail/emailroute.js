import express from "express";
import FacultyModel from "../model/faculty.model.js";
import handleError from "../errors/handle.error.js";
import { verification } from "./mailVarification.js";

const mailverificationRoute = express.Router();

mailverificationRoute.get("/verifymail/:email/:token", async (req, res) => {
  const { email, token } = req.params;
  if (!email && !token) {
    return handleError(res, 400, "Invalid request");
  }
  try {
    const findUser = await FacultyModel.findOne({ facultyEmail: email });
    if (!findUser) {
      delete verification[email]
      return handleError(res, 400, "user not found");
    }
    const data = verification[email];

    if (!data || data.token !== token || Date.now() > data.expires) {
      console.log(data)
      return res.render("expires");
    }

    if (findUser) {
      findUser.verified = true;
      await findUser.save();
      delete verification[email]
      return res.render("verified");
    }
  } catch (error) {
    return handleError(res, 500, error.message, "error");
  }
});
export default mailverificationRoute;
