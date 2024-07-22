import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStore from '@react-native-async-storage/async-storage';
import signUpReducer from './signUpSlice';

const persisConfig = {
  key: 'root',
  storage: AsyncStore,
  whitelist: ['signUp'],
};

const persistedReducer = persistReducer(persisConfig, signUpReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const store = configureStore({
  reducer: {
    signUp: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
