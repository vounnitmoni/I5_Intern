import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAuth {
    bool: boolean;
    boolean: boolean;
}

const initialState: IAuth = {
    bool: false,
    boolean: false,
};

export const circularSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    circularClick: (state, action: PayloadAction<boolean>) =>{
        state.bool = action.payload;
    },
    hasCommunity: (state, action: PayloadAction<boolean>) =>{
        state.boolean = action.payload;
    }
  },
});


export const {circularClick, hasCommunity} = circularSlice.actions;
export default circularSlice.reducer;
