import { configureStore } from "@reduxjs/toolkit";
import followingSlice from "./likes-slice";
import  vacationSlice  from "./vacation-slice";

const store = configureStore({
    reducer: {
        followingSlice,
        vacationSlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch