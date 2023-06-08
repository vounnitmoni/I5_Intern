import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IId{
    community_id?: number;
    user_id?: number;
    question_id?: number;
    answer_id?: number;
}

const initialState: IId = {
    community_id: undefined,
    user_id: undefined,
    question_id: undefined,
    answer_id: undefined,
};

export const idSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    setCommunityId: (state, action: PayloadAction<IId>) =>{
        return{
            ...state,
            community_id: action.payload.community_id,
        }
    },
    setUserId: (state, action: PayloadAction<IId>) =>{
        return{
            ...state,
            user_id: action.payload.user_id,
        }
    },
    setQuestionId: (state, action: PayloadAction<IId>) =>{
        return{
            ...state,
            question_id: action.payload.question_id,
        }
    },
    setAnswerId: (state, action: PayloadAction<IId>) =>{
        return{
            ...state,
            answer_id: action.payload.answer_id        
        }
    },

    removeAllId: () =>{
        return{
            community_id: undefined,
            user_id: undefined,
            question_id: undefined,
            answer_id: undefined,
        }
    }
  },
});

export const {setCommunityId, 
              setAnswerId, 
              setQuestionId, 
              setUserId, 
              removeAllId} = idSlice.actions;

export default idSlice.reducer;
