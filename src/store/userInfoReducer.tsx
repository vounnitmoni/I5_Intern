import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface IUserAtt {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    phone_number?: string;
    bio?: string;
    name_shortcut?: string;
    follower?: number;
    followee?: number;
    profile_pic?: string;
    cover_pic?: string;
    state?: boolean;
}

const initialState: IUserAtt = {
    firstname: undefined,
    lastname: undefined,
    username: undefined,
    email: undefined,
    phone_number: undefined,
    bio: undefined,
    name_shortcut: undefined,
    follower: undefined,
    followee: undefined,
    profile_pic: undefined,
    cover_pic: undefined,
    state: false,
};

export const userAttributeSlice = createSlice({
  name: 'userAttribute',
  initialState,
  reducers: {
    updateUserAttributes: (state, action: PayloadAction<IUserAtt>) => {
      return {
        ...state,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        username: action.payload.username,
        email: action.payload.email,
        phone_number: action.payload.phone_number,
        name_shortcut: action.payload.name_shortcut,
        followee: action.payload.followee,
        follower: action.payload.follower,
        profile_pic: action.payload.profile_pic,
        cover_pic: action.payload.cover_pic,
      };
    },

    updateUserBio: (state, action: PayloadAction<IUserAtt>) => {
        return {
            ...state,
            bio: action.payload.bio,
        }
    },

    userInfoState: (state, action: PayloadAction<IUserAtt>) => {
        return{
            ...state,
            state: action.payload.state,
        }
    },

    removeUserInfo: () =>{
      return{
        firstname: undefined,
        lastname: undefined,
        username: undefined,
        email: undefined,
        phone_number: undefined,
        bio: undefined,
        name_shortcut: undefined,
        follower: undefined,
        followee: undefined,
        profile_pic: undefined,
        cover_pic: undefined,
        state: false,
      }
    }
  },
});

export const {updateUserAttributes, updateUserBio, userInfoState, removeUserInfo} =
  userAttributeSlice.actions;

export default userAttributeSlice.reducer;
