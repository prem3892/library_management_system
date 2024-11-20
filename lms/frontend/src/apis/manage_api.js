
import axios from 'axios';
import toast from 'react-hot-toast'; 


export const appId =  "672388a94a7edf80fc5bf4e1";
const createFacultyAPi =  "http://localhost:8585/admin/672388a94a7edf80fc5bf4e1/createFaculty";


// "/api/v1/login"
const loginFacultyApi =  "http://localhost:8585/login";
const displayCardHomeApi =  "http://localhost:8585/672388a94a7edf80fc5bf4e1/getCourse"

// ! create api call
export const createFaculty =  async(formData)=>{
    try{
        const response = await axios.post(createFacultyAPi, formData);
        return response.data;
    }catch(e){
        if(e.response.status === 401){
            toast.error("password error");
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
}
}


// !    card apis 

export const addCard =  async(formData)=>{
    const facultyID =  formData.get("facultyId")
    try{
const response =  await axios.post(`http://localhost:8585/faculty/${facultyID}/add-course`,formData);
return response.data;
    }catch(e){
        console.log(e);
        return;
    }
}

// ! fetchCard  using faculty
export const fetchCard =  async(id)=>{
    const d = String(id)
    try{
        const response =  await axios.get(`http://localhost:8585/faculty/${d}/courses`);
        return response.data;
    }catch(e){
        console.log(e)
        if(e.response.message === "Faculty not found"){
            throw new Error("Faculty not found")
        }   
    }
}

// !  display all cards home page  by admin
export const displayCards =  async()=>{
    try
    {
const response =  await axios.get(displayCardHomeApi);
return response.data;
    }catch(e){
        throw new Error(e.message)
    }
}



// ! update course by faculty id api 

export const updateCoursebyFaculty =  async(formData)=>{
    const fid=  formData.get("fid");
    const cid=  formData.get("cid");
    if(!fid || !cid)
        return alert("ids not found")
    try{
        
        const response =  await axios.put(`http://localhost:8585/faculty/${fid}/update-course/${cid}`, formData);
        return response.data
    }catch(e){
       return  console.log(e)
    }
}

// ! delete course by faculty 
export const deleteCourseByFaculty =  async(ids)=>{
                const {id, courseId} =  ids;
                if(!id && !courseId){
                    return alert("ids not found")
                }
    try{
        const response =  await axios.delete(`http://localhost:8585/faculty/${id}/course-delete/${courseId}`);
        return response.data;
    }catch(e){
        console.log(e)
    }
}