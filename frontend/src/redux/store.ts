import { configureStore } from "@reduxjs/toolkit";
import followersSlice from "./followers-slice";
import followingSlice from "./following-slice";
import  vacationSlice  from "./vacation-slice";
import feedSlice from "./feed-slice";

const store = configureStore({
    reducer: {
        followersSlice,
        followingSlice,
        vacationSlice,
        feedSlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch