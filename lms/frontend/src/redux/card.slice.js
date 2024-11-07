import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { addCard, fetchCard } from '../apis/manage_api';

export const addCardThunk =  createAsyncThunk("add-card", async(formData, {rejectWithValue})=>{
    try{
        const result =  await addCard(formData);
        return result;
    }catch(e){
        return rejectWithValue(e.message);
    }
});

export const fetchCardThunk =  createAsyncThunk('get-card', async()=>{
    try{
        const result =  await fetchCard();
        return result.message;
    }catch(e){
        console.log(e)
    }
})


const cardSlice =  createSlice({
    name: "card",
    initialState: {
        card: [],
        loading: false
    },
    reducers: {},
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
    }
})

export default  cardSlice.reducer;