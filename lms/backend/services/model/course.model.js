import mongoose from 'mongoose';


const courseSchema =  new mongoose.Schema({
    courseTitle: String,
    courseContent: String,
    coursePdf: String,
    author: String,
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "faculty",
        required: true
    }
});


const courseModel =  mongoose.model("Course", courseSchema);

export default courseModel;