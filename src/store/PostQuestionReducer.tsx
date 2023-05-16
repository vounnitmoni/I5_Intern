import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IQuestion {
    question?: string;
    body?: string;
    image?: string[];
    community?: string,
}

const initialState: IQuestion = {
    question: undefined,
    body: undefined,
    image: undefined,
    community: undefined,
};

export const questionRequestSlice = createSlice({
  name: 'questionRequest',
  initialState: initialState,
  reducers: {
    setData: (state, action: PayloadAction<IQuestion>) =>{
        return{
            ...state,
            question: action.payload.question,
            body: action.payload.body,
            community: action.payload.community,
            image: action.payload.image,
        }
    },
    resetData: state =>{
            state.question= undefined;
            state.body= undefined;
            state.image = undefined;
            state.community= undefined;
    },
  },
});


export const {setData, resetData} = questionRequestSlice.actions;
export default questionRequestSlice.reducer;
