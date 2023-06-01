import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {createTransform, persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

import settingReducer from './settingReducer';
import settings from '../../config/settings';
import AuthReducer from './onClickRecursiveReducer';
import onClickRecursiveReducer from './onClickRecursiveReducer';
import questionId from './questionId';
import { QuestionRequestSlice } from './QuestionRequestionReducer';
import PostQuestionReducer from './PostQuestionReducer';
import userInfoReducer, { userAttributeSlice } from './userInfoReducer';

const rootReducers = {
  setting: settingReducer,
  circular: onClickRecursiveReducer,
  question_id: questionId,
  question_request: PostQuestionReducer,
  userAttribute: userInfoReducer,
};

const middlewares = [thunk];

if (settings.isDebug) {
  const {logger} = require('redux-logger');
  middlewares.push(logger);
}

const blacklistTransform = createTransform((inboundState: any, key) => {
  if (key === 'auth') {
    return _.omit(inboundState, []);
  } else {
    return inboundState;
  }
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['localize'],
  transforms: [blacklistTransform],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducers),
);

export const store = configureStore({
  reducer:{
    persistedReducer,     
    onClickRecursiveReducer,
    questionId,
    PostQuestionReducer,
    userInfoReducer,
  },
  middleware: middlewares,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
