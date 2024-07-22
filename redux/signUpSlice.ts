import { createSlice } from '@reduxjs/toolkit';
import { TattoState, AccountState, TermState } from './stateTypes';

type SliceState = {
  email?: string;
  password?: string;
  name?: string;
  sex?: boolean;
  birthday?: Date;
  home?: string;
  height?: number;
  weight?: number;
  phone?: string;
  enteredTatto?: boolean;
  hasTatto?: boolean;
  tatto?: TattoState;
  enteredAccount?: boolean;
  account?: AccountState;
  terms?: TermState;
};

const initialState: SliceState = {};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    initalSignUpData: state => {
      state = {
        email: '',
        password: '',
        name: '',
        sex: false,
        birthday: new Date(),
        home: '',
        height: 0.0,
        weight: 0.0,
        phone: '',
        enteredTatto: false,
      };
    },
    initalTerms: (state, action) => {
      state.terms = action.payload;
    },
    setBasicData: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.sex = action.payload.sex;
      state.birthday = action.payload.birthday;
      state.home = action.payload.home;
    },
    setPhysicalData: (state, action) => {
      state.height = action.payload.height;
      state.weight = action.payload.weight;
    },
    setTattoData: (state, action) => {
      state.enteredTatto = true;
      state.hasTatto = action.payload.hasTatto;
      state.tatto = action.payload.tatto;
    },
    setAccountData: (state, action) => {
      state.enteredAccount = true;
      state.account = action.payload.account;
    },
    resetState: state => {
      state = initialState;
    },
  },
});

export const {
  initalSignUpData,
  initalTerms,
  setBasicData,
  setPhysicalData,
  setTattoData,
  setAccountData,
  resetState,
} = signUpSlice.actions;
export default signUpSlice.reducer;
