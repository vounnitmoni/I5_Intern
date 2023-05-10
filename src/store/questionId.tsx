import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface QId {
    q_id : number
}

const initialState: QId = {
    q_id: 0,
};

export const q_idSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    click: (state, action: PayloadAction<number>) =>{
        state.q_id = action.payload;
    }
  },
});


export const {click} = q_idSlice.actions;
export default q_idSlice.reducer;