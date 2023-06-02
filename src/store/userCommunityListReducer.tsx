import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ICommunityList {
    id?: number;
    community_name?: string;
}

const initialState: ICommunityList[] = []

export const communityListSlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    communityListAttribute: (state, action: PayloadAction<ICommunityList>) => {
        return[
            ...state,
            {
                id: action.payload.id,
                community_name: action.payload.community_name
            }
        ]
    }
  },
});

export const {communityListAttribute} = communityListSlice.actions;

export default communityListSlice.reducer;
