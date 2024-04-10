import { thunk } from "redux-thunk";
import counterSlice from "./counterSlice";
import counterReducer from "./counterSlice"
import platformReducer from "./platformSlice";
import activePlayerReducer from "./activePlayerSlice";
import propItemModalReducer from "./propItemModalSlice";
const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        platform: platformReducer,
        activePlayer: activePlayerReducer,
        propItemModal: propItemModalReducer
    },
})