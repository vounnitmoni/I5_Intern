import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAuth {
    bool: boolean;
}

const initialState: IAuth = {
    bool: false,
};

export const circularSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    circularClick: (state, action: PayloadAction<boolean>) =>{
        state.bool = action.payload;
    }
  },
});


export const {circularClick} = circularSlice.actions;
export default circularSlice.reducer;
