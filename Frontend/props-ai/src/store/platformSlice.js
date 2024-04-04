import {createSlice, configureStore} from '@reduxjs/toolkit';

export const platformSlice = createSlice({
    name: 'platform',
    initialState: {
        value: {
            platform: "PrizePicks",
            img: "./platforms/pp.png",
            id: 0
        },
        id: 0
    },
    reducers: {
        changePlatform: (state, action) => {
            state.value = action;
        },
        
    },
});

export const {changePlatform} = platformSlice.actions
export default platformSlice.reducer