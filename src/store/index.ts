import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {createTransform, persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

import settingReducer from './settingReducer';
import settings from '../../config/settings';
import onClickRecursiveReducer from './onClickRecursiveReducer';
import questionId from './questionId';
import PostQuestionReducer from './PostQuestionReducer';
import userInfoReducer from './userInfoReducer';
import userCommunityListReducer from './userCommunityListReducer';
import IdReducer from './IdReducer';
import followReducer from './followReducer';

const rootReducers = {
  setting: settingReducer,
  circular: onClickRecursiveReducer,
  question_id: questionId,
  question_request: PostQuestionReducer,
  userAttribute: userInfoReducer,
  userCommunityList: userCommunityListReducer,
  idReducer: IdReducer,
  followReducer: followReducer,
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
    userCommunityListReducer,
    IdReducer,
    followReducer,
  },
  middleware: middlewares,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
