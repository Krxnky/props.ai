import counterSlice from "./counterSlice";
import counterReducer from "./counterSlice"
import platformReducer from "./platformSlice";
const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        platform: platformReducer,
    }
})