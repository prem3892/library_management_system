import mongoose from 'mongoose';


const facultySchema = new mongoose.Schema({
    facultyName: {
      type: String,
      required: true,
    },
    facultyEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    facultyMobile: {
      type: String,
      required: true,
    },
    facultyPassword: {
      type: String,
      required: true,
    },
    facultyProfile: {
      type: String,
    },
    adminID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    verified:{
      type:Boolean,
      default:false
    }
  }, { timestamps: true });
  
  const FacultyModel = mongoose.model("faculty", facultySchema);
  
  export default FacultyModel;
  