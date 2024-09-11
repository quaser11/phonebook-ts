import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    name: ''
}

export const filter = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.name = action.payload;
        }
    }
})

export const {setFilter} = filter.actions;
