import { createSlice } from "@reduxjs/toolkit";

export const activePlayerSlice = createSlice({
    name: 'activePlayer',
    initialState:{
        value:{
            accuracy: 'default',
            f1: 'default',
            line_score: 'default',
            player_id: 'default',
            player_name: 'John Doe',
            player_team: 'default',
            precision: 'default',
            prediction: 'default',
            projection_id: 'default',
            recall: 'default',
            start_time: 'default',
            stat_type: 'default',
            lastTen: []
          },
        id: 0
    },
    reducers: {
        changeActivePlayer: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {changeActivePlayer} = activePlayerSlice.actions
export default activePlayerSlice.reducer