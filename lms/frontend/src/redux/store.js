import {configureStore} from '@reduxjs/toolkit'
import facultySlice from './facullty.slice';

const store =  configureStore({
    reducer: {
        faculty: facultySlice
    }
});

export default store;