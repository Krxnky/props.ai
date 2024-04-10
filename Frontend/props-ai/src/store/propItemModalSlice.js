import { createSlice } from "@reduxjs/toolkit";

export const propItemModalSlice = createSlice({ 
    name: 'propItemModal',
    initialState: {
        value: false
    },
    reducers: {
        changePropItemModal: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {changePropItemModal} = propItemModalSlice.actions
export default propItemModalSlice.reducer