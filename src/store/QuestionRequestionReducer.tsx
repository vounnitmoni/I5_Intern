import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IRequest {
    id: number;
    question: string;
    body: string; 
    post_stmp: string; 
    community: string;
    answer: number;
    vote: number;
    photo: string[];
}

const initialState: IRequest = {
    id: 0,
    question: '',
    body: '',
    post_stmp: '',
    community: '',
    answer: 0,
    vote: 0,
    photo: [],
};

export const QuestionRequestSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    getData: (state, action: PayloadAction<IRequest>) =>{
        state.answer = action.payload.answer;
        state.body = action.payload.body;
        state.community = action.payload.community; 
        state.id = action.payload.id;
        state.photo = action.payload.photo; 
        state.post_stmp = action.payload.post_stmp;
        state.question = action.payload.question;
        state.vote = action.payload.vote;
    }
  },
});


// export const {getData} = QuestionRequestSlice.actions;
// export default QuestionRequestSlice.reducer;

// link to study
// https://medium.com/front-end-weekly/typing-actions-and-action-payloads-for-redux-toolkit-460f20b962c1