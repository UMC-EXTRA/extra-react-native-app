import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStore from '@react-native-async-storage/async-storage';

import signUpReducer from './slice/signUpSlice';
import profileReducer from './slice/profileSlice';
import manageReducer from './manage/manageSlice';

const signUpConfig = {
  key: 'signUp',
  storage: AsyncStore,
  whitelist: ['signUp'],
};

const profileConfig = {
  key: 'profile',
  storage: AsyncStore,
  whitelist: ['requiredTerms', 'eventNoticeAgree'],
};

const manageConfig = {
  key: 'manage',
  storage: AsyncStore,
  whitelist: ['manage', 'noticeId', 'type', 'clockInTime', 'clockOutTime'],
};

const chatConfig = {
  key: 'chat',
  storage: AsyncStore,
  whitelist: ['chat'],
};

const rootReducer = combineReducers({
  signUp: persistReducer(signUpConfig, signUpReducer),
  profile: persistReducer(profileConfig, profileReducer),
  manage: persistReducer(manageConfig, manageReducer),
  //  chat: persistReducer(chatConfig, chatReducer),
});

export default rootReducer;
