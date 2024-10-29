import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { createFaculty } from '../apis/manage_api';


export const createFacultyThunk = createAsyncThunk("create-faculty", async(formData, {rejectWithValue})=>{
    try{
        const result = await createFaculty(formData);
        return result;
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
        builder.addCase(createFacultyThunk.pending, (state)=>{
            state.loading =  true;
        })
        builder.addCase(createFacultyThunk.fulfilled, (state, action)=>{
            state.loading =  false;
            state.faculty =  action.payload;
        })
        builder.addCase(createFacultyThunk.rejected, (state)=>{
            state.loading =  true;
        })
    }
});


export default facultySlice.reducer;