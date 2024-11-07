
import axios from 'axios';
// import toast from 'react-hot-toast'; 


export const appId =  "672388a94a7edf80fc5bf4e1";
const createFacultyAPi =  "http://localhost:8585/admin/672388a94a7edf80fc5bf4e1/createFaculty";
const loginFacultyApi =  "http://localhost:8585/login";
const cardAPI =  "http://localhost:8585/672388a94a7edf80fc5bf4e1/getCourse"

// const cardAPI =  "http://localhost:8585/faculty/:id/add-course"

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



// !    card apis 

export const addCard =  async(formData)=>{
    const facultyID =  formData.get("facultyId")
    try{
const response =  await axios.post(`http://localhost:8585/faculty/${facultyID}/add-course`,formData);
return response.data;
    }catch(e){
        console.log(e)
    }
}

// ! fetchCard 
export const fetchCard =  async()=>{
    try{
        const response =  await axios.get(cardAPI);
        return response.data;
    }catch(e){
        console.log(e);
        throw new Error(e.message)
    }
}