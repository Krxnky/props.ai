import {createSlice, configureStore} from '@reduxjs/toolkit';

export const platformSlice = createSlice({
    name: 'platform',
    initialState: {
        value: {
            platform: "PrizePicks",
            img: "/pp.png",
            id: 0
        },
        id: 0
    },
    reducers: {
        changePlatform: (state, action) => {
            state.value = action.payload;
        },
        
    },
});

export const {changePlatform} = platformSlice.actions
export default platformSlice.reducer