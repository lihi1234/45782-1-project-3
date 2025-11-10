import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type Vacation from "../models/vacation";
// import type PostComment from "../models/post-comment";



interface VacationState {
    newVacation?: Vacation
    vacations: Vacation[]
}

const initialState: VacationState = {
    newVacation: undefined,
    vacations: []
};

export const vacationSlice = createSlice({
    name: 'vacation',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload;
        },
        newVacation: (state, action: PayloadAction<Vacation>) => {
            // state.posts = [action.payload, ...state.posts]
            state.newVacation = action.payload;
        },
        updateVacation: (state, action: PayloadAction<Vacation>) => {
            const idx = state.vacations.findIndex(p => p.id === action.payload.id);
            if (idx > -1) state.vacations[idx] = action.payload;
        },
        // newComment: (state, action: PayloadAction<PostComment>) => {
        //     const post = state.posts.find(p => p.id === action.payload.postId);
        //     post?.comments.push(action.payload);
        // },
        deleteVacation: (state, action: PayloadAction<string>) => {
            state.vacations = state.vacations.filter(p => p.id !== action.payload);
        }
        ,
        vacationAged: (state) => {
            if (state.newVacation) {
                state.vacations = [state.newVacation, ...state.vacations];
                state.newVacation = undefined;
            }
        }
    }
});

export const { init, newVacation, updateVacation, deleteVacation, vacationAged} = vacationSlice.actions;

export default vacationSlice.reducer;