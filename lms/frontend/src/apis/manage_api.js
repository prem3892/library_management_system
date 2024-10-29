
import axios from 'axios';


export const appId =  "6720d96da81467d92b50042f";
const createFacultyAPi =  "http://localhost:8585/api/v1//admin/6720d96da81467d92b50042f/createFaculty";


export const createFaculty =  async(formData)=>{
    try{
        const response = await axios.post(`${createFacultyAPi/formData}`);
        return response.data;
    }catch(e){
        console.log(e)
    }
}