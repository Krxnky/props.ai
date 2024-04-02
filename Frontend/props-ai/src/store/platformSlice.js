import {createSlice, configureStore} from '@reduxjs/toolkit';

export const platformSlice = createSlice({
    name: 'platform',
    initialState: {
        value: 'PrizePicks',
        id: 0
    },
    reducers: {
        changePlatform: (state, platform) => {
            state.value = platform;
        },
        
    },
});

export const {changePlatform} = platformSlice.actions
export default platformSlice.reducer