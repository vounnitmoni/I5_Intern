import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ICommunityList {
    id?: number;
    name?: string;
    state?: boolean;
    image?: string;
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
                name: action.payload.name,
                image: action.payload.image
            }
          ]
    },
    communityStateChange: (state, action: PayloadAction<ICommunityList>) => {
      return[
          ...state,
          {
            state: action.payload.state,
          }
      ]
    },
    removeCommunityListAttribute:()=>{
      return[]
    }
  },
});

export const {communityListAttribute, communityStateChange, removeCommunityListAttribute} = communityListSlice.actions;

export default communityListSlice.reducer;
