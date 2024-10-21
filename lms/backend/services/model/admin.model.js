import mongoose from 'mongoose';

const adminSchema =  new mongoose.Schema({
    user: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        
    }

})

const adminModel =  mongoose.model("Admin", adminSchema);
export default adminModel;

