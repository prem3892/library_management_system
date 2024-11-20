import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { addCard, deleteCourseByFaculty, displayCards, fetchCard, updateCoursebyFaculty } from '../apis/manage_api';



// ! add card thunk by faculty id 
export const addCardThunk =  createAsyncThunk("add-card", async(formData, {rejectWithValue})=>{
    try{
        const result =  await addCard(formData);
        return result;
    }catch(e){
        return rejectWithValue(e.message);
    }
});

// ! fetch card by faculty id thunk 
export const fetchCardThunk =  createAsyncThunk('get-card', async(id)=>{
    try{
        const result =  await fetchCard(id);
        return result;
    }catch(e){
        console.log(e)
    }
})

// ! display all card on home page by admin 
export const displaycardThunk =  createAsyncThunk("display-card", async()=>{
    try{
const result  =  await displayCards();
return result;
    }catch(e){
        console.log(e)
    }
});


// ! update course thunk 
export const updateCourseThunk =  createAsyncThunk("update-course", async(formData, {rejectWithValue})=>{
    try{
        const result =  await updateCoursebyFaculty(formData);
        return result;
    }catch(e){
       return rejectWithValue(e.message)
    }
});


// ! delete course think 
export const deleteCourseByFacultyThunk =  createAsyncThunk("delete-course", async(ids, {rejectWithValue})=>{
try{
const result = await deleteCourseByFaculty(ids);
return result;

}catch(e){
return rejectWithValue(e.message)
}
})

const cardSlice =  createSlice({
    name: "card",
    initialState: {
        card: [],
        homeCard:[],
        loading: false,
        searchCard: []
    },
    reducers: {
        // searchCard: (state, action)=>{
        //     state.searchCard =  state.homeCard.filter((i)=>i.courseTitle.toLowerCase() === action.payload.toLowerCase());
        // }
    },
    extraReducers: (builder)=>{
        builder.addCase(addCardThunk.pending, (state, action)=>{
            state.loading =  true;
        });
        builder.addCase(addCardThunk.fulfilled, (state, action)=>{
            state.loading =  false;
            state.card =   action.payload;
        });

        builder.addCase(addCardThunk.rejected, (state, aciton)=>{
            state.loading =  true;
        });

        // ! fetch card thunk
        builder.addCase(fetchCardThunk.pending, (state, action)=>{
            state.loading =  true;
        });
        builder.addCase(fetchCardThunk.fulfilled, (state, action)=>{
            state.loading =  false;
            state.card =   action.payload;
        });

        builder.addCase(fetchCardThunk.rejected, (state, aciton)=>{
            state.loading =  true;
        })
        // ! display all  card thunk
        builder.addCase(displaycardThunk.pending, (state, action)=>{
            state.loading =  true;
        });
        builder.addCase(displaycardThunk.fulfilled, (state, action)=>{
            state.loading =  false;
            state.homeCard =   action.payload;
        });

        builder.addCase(displaycardThunk.rejected, (state, aciton)=>{
            state.loading =  true;
        })
        
        // ! update course  thunk
        builder.addCase(updateCourseThunk.pending, (state, )=>{
            state.loading =  true;
        });
        builder.addCase(updateCourseThunk.fulfilled, (state, action)=>{
            state.loading =  false;
            state.homeCard =   action.payload;
        });

        builder.addCase(updateCourseThunk.rejected, (state, aciton)=>{
            state.loading =  true;
        })

        // ! delete course  thunk
        builder.addCase(deleteCourseByFacultyThunk.pending, (state, )=>{
            state.loading =  true;
        });
        builder.addCase(deleteCourseByFacultyThunk.fulfilled, (state, action)=>{
            state.loading =  false;
            state.homeCard =   action.payload;
        });

        builder.addCase(deleteCourseByFacultyThunk.rejected, (state, aciton)=>{
            state.loading =  true;
        })
    }
})

// export const {searchCard} =  cardSlice.actions;

export default  cardSlice.reducer;