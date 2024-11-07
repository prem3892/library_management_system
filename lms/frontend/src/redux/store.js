import {configureStore} from '@reduxjs/toolkit'
import facultySlice from './facullty.slice';
import cardSlice from './card.slice';

const store =  configureStore({
    reducer: {
        faculty: facultySlice,
        card: cardSlice
    }
});

export default store;