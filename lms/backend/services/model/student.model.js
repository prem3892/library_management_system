import mongoose from 'mongoose';


const studentSchema =  new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
       
    },
    studentEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    studentMobile: {
        type: String,
        required: true,

    },
    studentPassword: {
        type: String,
        required: true,
        minlength: 3
    },
    studentProfile: {
        type: String,
    },
    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }
}, {timestamps: true})

const studentModel =  mongoose.model("student", studentSchema);

export default studentModel;
