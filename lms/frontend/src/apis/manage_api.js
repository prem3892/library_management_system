
import axios from 'axios';
// import toast from 'react-hot-toast'; 


export const appId =  "672388a94a7edf80fc5bf4e1";
const createFacultyAPi =  "http://localhost:8585/admin/672388a94a7edf80fc5bf4e1/createFaculty";
const loginFacultyApi =  "http://localhost:8585/login"

// ! create api call
export const createFaculty =  async(formData)=>{
    try{
        const response = await axios.post(createFacultyAPi, formData);
        return response.data;
    }catch(e){
        console.log(e.response.data)
        if(e.response.status === 401){
            // toast.error("password error");
            throw new Error(alert("invalid password length"));
        }

        if(e.response.status === 400){
            throw new Error(alert("Email already exists"))
        }
    }
}

// ! login faculty 
export const loginFaculty =  async(formData)=>{
    try{
        const response = await axios.post(loginFacultyApi,formData);
        return response.data;
    }catch(e){
        if(e.response.data.message ==="Email is not registered"){
            throw new Error(alert("Invalid Email"));
        }
        if(e.response.data.message === "invalid password"){
            throw new Error(alert("Invalid Password"))
        }
       else{
            throw new Error("server error")
        }
    }
}