import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IId{
    community_id?: number;
    user_id?: number;
    question_id?: number;
    answer_id?: number;
    comment_id?: number;
    comment_parent?: number | null;
}

const initialState: IId = {
    community_id: undefined,
    user_id: undefined,
    question_id: undefined,
    answer_id: undefined,
    comment_id: undefined,
    comment_parent: null,
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
    setCommentId: (state, action: PayloadAction<IId>) =>{
        return{
            ...state,
            comment_id: action.payload.comment_id        
        }
    },
    setParentCommentId: (state, action: PayloadAction<IId>) =>{
        return{
            ...state,
            comment_parent: action.payload.comment_parent       
        }
    },
    setBothCommentId: (state, action: PayloadAction<IId>) =>{
        return{
            ...state,
            comment_parent: action.payload.comment_parent,
            comment_id: action.payload.comment_id,       
        }
    },


    removeAllId: () =>{
        return{
            community_id: undefined,
            user_id: undefined,
            question_id: undefined,
            answer_id: undefined,
            comment_id: undefined,
            comment_parent: null,
        }
    }
  },
});

export const {setCommunityId, 
              setAnswerId, 
              setQuestionId, 
              setUserId, 
              removeAllId,
              setBothCommentId,
              setCommentId,
              setParentCommentId} = idSlice.actions;

export default idSlice.reducer;
