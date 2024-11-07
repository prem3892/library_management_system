import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { createFaculty, loginFaculty } from '../apis/manage_api';


// ! create thunk
export const createFacultyThunk = createAsyncThunk("create-faculty", async(formData, {rejectWithValue})=>{
    try{
        const result = await createFaculty(formData);
        return result;
    }catch(e){
        return rejectWithValue(e.message);
    }
});

// ! login thunk
export const loginFacultyThunk =  createAsyncThunk("login", async(formData, {rejectWithValue})=>{
    try{
        const result = await loginFaculty(formData);
        if(result){
            const token =  result.result;
            const facultyProfile =  result.data.facultyProfile;
            localStorage.setItem("token", token);
            localStorage.setItem("email", formData.email);
            localStorage.setItem("facultyProfile", facultyProfile);
            localStorage.setItem("facultyID", result.data._id);
                return result.data;
        }
    }catch(e){
        return rejectWithValue(e.message);
    }
});


const facultySlice =  createSlice({
    name: "faculty",
    initialState: {
        faculty: [],
        loading: false,
    },
    reducers: {
      
    },
    extraReducers: (builder)=>{
        // ! register builder
        builder.addCase(createFacultyThunk.pending, (state)=>{
            state.loading =  true;
        })
        builder.addCase(createFacultyThunk.fulfilled, (state, action)=>{
            state.loading =  false;
            state.faculty =  action.payload;
        })
        builder.addCase(createFacultyThunk.rejected, (state)=>{
            state.loading =  true;
        });
        // ! login builder 
        builder.addCase(loginFacultyThunk.pending, (state)=>{
            state.loading =  true;
        })
        builder.addCase(loginFacultyThunk.fulfilled, (state, action)=>{
            state.loading =  false;
            state.faculty =  action.payload;
        })
        builder.addCase(loginFacultyThunk.rejected, (state)=>{
            state.loading =  true;
        });
    }
});


export default facultySlice.reducer;