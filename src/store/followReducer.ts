import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum EFollowPressStatus{
    FOLLOWER = "FOLLOWER",
    FOLLOWEE = "FOLLOWEE"
}

interface follow {
    follow_status?: EFollowPressStatus
    toggle?: boolean
}

const initialState: follow = {
    follow_status: undefined,
    toggle: false,
};

export const follow_slice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    followStatusClick: (state, action: PayloadAction<follow>) =>{
        return{
            toggle: action.payload.toggle,
            follow_status: action.payload.follow_status
        }
    },
    setToggle: (state, action: PayloadAction<follow>) =>{
        return{
            ...state,
            toggle: action.payload.toggle
        }
    }
  },
});


export const {followStatusClick} = follow_slice.actions;
export default follow_slice.reducer;