import {createSlice} from '@reduxjs/toolkit';

interface ISetting {}

const initialState: ISetting = {};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {},
});

export const {} = settingSlice.actions;

export default settingSlice.reducer;
