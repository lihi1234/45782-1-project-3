import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type Like from "../models/like";

interface likesState {
    likes: Like[],
    isNewContentAvailable: boolean

}

const initialState: likesState = {
    likes: [],
    isNewContentAvailable: false

};

export const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Like[]>) => {
            state.likes = action.payload;
        },
        like: (state, action: PayloadAction<Like>) => {
            state.likes.push(action.payload);
        },
        unlike: (state, action: PayloadAction<Like>) => {
            state.likes = state.likes.filter(l => l !== action.payload);
        },
        indicateNewContentAvailable: (state) => {
            state.isNewContentAvailable = true;
        }
    }
});

export const { init, like, unlike, indicateNewContentAvailable } = likesSlice.actions;

export default likesSlice.reducer;