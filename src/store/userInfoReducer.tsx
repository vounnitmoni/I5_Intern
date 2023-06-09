import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface IUserAtt {
    id?: number;
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
    is_followed?: boolean;
    is_notified?: boolean;
}

const initialState: IUserAtt = {
    id: undefined,
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
    is_followed: false,
    is_notified: false,
};

export const userAttributeSlice = createSlice({
  name: 'userAttribute',
  initialState,
  reducers: {
    updateAppUserAttributes: (state, action: PayloadAction<IUserAtt>) => {
      return {
        ...state,
        id: action.payload.id,
        bio: action.payload.bio,
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

    updateOtherUserInfo: (state, action: PayloadAction<IUserAtt>) =>{
        return{
          ...state,
          id: action.payload.id,
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
          bio: action.payload.bio,
          is_followed: action.payload.is_followed,
          is_notified: action.payload.is_notified,
        }
    },

    removeUserInfo: () =>{
      return{
        id: undefined,
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
        is_followed: false,
        is_notified: false,
      }
    }
  },
});

export const {updateAppUserAttributes, updateUserBio, userInfoState, removeUserInfo} =
  userAttributeSlice.actions;

export default userAttributeSlice.reducer;
