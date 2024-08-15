import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStore from '@react-native-async-storage/async-storage';

import signUpReducer from './slice/signUpSlice';
import profileReducer from './slice/profileSlice';
import companyManageReducer from './manage/companyManageSlice';
import memberManageReducer from './manage/memberManageSlice';

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

const companyManageConfig = {
  key: 'companyManage',
  storage: AsyncStore,
  whitelist: ['companyManage', 'noticeId', 'clockInTime', 'clockOutTime'],
};

const memberManageConfig = {
  key: 'memberManage',
  storage: AsyncStore,
  whitelist: ['memberManage', 'noticeId'],
};

// const chatConfig = {
//   key: 'chat',
//   storage: AsyncStore,
//   whitelist: ['chat'],
// };

const rootReducer = combineReducers({
  signUp: persistReducer(signUpConfig, signUpReducer),
  profile: persistReducer(profileConfig, profileReducer),
  companyManage: persistReducer(companyManageConfig, companyManageReducer),
  memberManage: persistReducer(memberManageConfig, memberManageReducer),
  //  chat: persistReducer(chatConfig, chatReducer),
});

export default rootReducer;
