import express from 'express';
const app = express();
import morgan from 'morgan';
import bodyParser from 'body-parser';
import  'dotenv/config'
const port  =  process.env.PORT || 4000;
import fs from 'fs';
import db from './services/database/db.js';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
const streame = fs.createWriteStream("./services/logs/config.txt", {flags: "a"});
app.use(
    cors({
        origin: (_, callback) => {
            callback(null, true);
          },
      credentials: true,
    })
  );
app.use(morgan('combined', {stream: streame}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// ! static path
const staticCoursesPath = path.join("public/courses");
const statisFacultyPath =  path.join("public/faculty")
app.use("/course", express.static(staticCoursesPath));
app.use("/faculty", express.static(statisFacultyPath));
app.use(cookieParser());

app.set("view engine", "ejs")


//! db
db();

// ! all routes here 

// ! admin routes 
import adminRoute from './services/routes/admin.routes.js';
app.use("/", adminRoute);


// ! faculty routes 
import facultyRoute from './services/routes/faculty.routes.js';
app.use("/", facultyRoute);


//! course routes
import courseRoute from './services/routes/course.routes.js';
app.use("/", courseRoute);


//! student routes
import studentRoute from './services/routes/student.routes.js';
app.use("/", studentRoute);

// ! mail verification route
import mailverificationRoute from './services/mail/emailroute.js';
import forgetRoute from './services/mail/forget.otp.js';

app.use("/", mailverificationRoute);

// ! forgget
app.use("/", forgetRoute)



import mongoose from 'mongoose';
import cron from 'node-cron';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Register user
app.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      isVerified: false
    });
    await newUser.save();
    res.status(201).send('User created, will be deleted if not verified in 10 seconds');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});


cron.schedule('* * * * *', async () => {
  const tenSecondsAgo = new Date(Date.now() - 60 * 1000);
  
  try {
    await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: tenSecondsAgo }
    });
  } catch (error) {
    console.error('Error deleting unverified users:', error);
  }
});


app.listen(port, ()=>{
    console.log(`server connected on port http://localhost:${port}`);
});