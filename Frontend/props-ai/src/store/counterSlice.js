import {createSlice, configureStore} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        incremented: state => {
            state.value += 1;
        },
        decremented: state => {
            state.value -= 1;
        },
    },
});

export const {increment, decrement} = counterSlice.actions
export default counterSlice.reducer