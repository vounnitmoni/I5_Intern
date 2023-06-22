import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { EISA } from '../enums/EISA';

interface ICommunityList {
    id?: number;
    name?: string;
    state?: boolean;
    image?: string;
    isa?: EISA;
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
                image: action.payload.image,
                isa: action.payload.isa
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
