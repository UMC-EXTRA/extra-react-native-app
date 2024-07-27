import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  TattoState,
  AccountState,
  TermState,
  SignUpState,
  UserState,
  AdminState,
} from './stateTypes';

const initialState: SignUpState = {
  type: '',
  email: '',
  password: '',
  name: '',
  sex: false,
  birthday: '',
  phone: '',
};

const userInitState: UserState = {
  type: 'user',
  email: '',
  password: '',
  name: '',
  sex: false,
  birthday: '',
  home: '',
  height: 0.0,
  weight: 0.0,
  phone: '',
  enteredTatto: false,
  hasTatto: false,
  tatto: {
    face: false,
    chest: false,
    arm: false,
    leg: false,
    shoulder: false,
    back: false,
    hand: false,
    feet: false,
    etc: false,
  },
  enteredAccount: false,
  account: {
    bankName: '',
    accountNumber: '',
    accountHolder: '',
  },
  terms: [],
};

const adminInitState: AdminState = {
  type: 'admin',
  email: '',
  password: '',
  name: '',
  sex: false,
  birthday: '',
  phone: '',
  enteredCompany: false,
  company: '',
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    initType: (state, action) => {
      if (action.payload === 'user') {
        return { ...userInitState };
      }
      if (action.payload === 'admin') {
        return { ...adminInitState };
      }
    },
    setBasicData: (
      state: SignUpState,
      action: PayloadAction<{
        email: string;
        name: string;
        sex: boolean;
        birthday: string;
        home?: string;
      }>,
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.sex = action.payload.sex;
      state.birthday = action.payload.birthday;
      if (state.type === 'user' && action.payload.home) {
        (state as UserState).home = action.payload.home;
      }
    },
    setPhysicalData: (
      state,
      action: PayloadAction<{ height: number; weight: number }>,
    ) => {
      if (state.type === 'user') {
        (state as UserState).height = action.payload.height;
        (state as UserState).weight = action.payload.weight;
      }
    },
    setTattoData: (
      state,
      action: PayloadAction<{ hasTatto: boolean; tatto: TattoState }>,
    ) => {
      if (state.type === 'user') {
        (state as UserState).enteredTatto = true;
        (state as UserState).hasTatto = action.payload.hasTatto;
        (state as UserState).tatto = action.payload.tatto;
      }
    },
    setAccountData: (
      state,
      action: PayloadAction<{ account: AccountState }>,
    ) => {
      if (state.type === 'user') {
        (state as UserState).enteredAccount = true;
        (state as UserState).account = action.payload.account;
      }
    },
    setCompanyData: (state, action: PayloadAction<{ company: string }>) => {
      if (state.type === 'admin') {
        (state as AdminState).enteredCompany = true;
        (state as AdminState).company = action.payload.company;
      }
    },
    setTermData: (state, action: PayloadAction<TermState>) => {
      if (state.type === 'user') {
        (state as UserState).terms = action.payload;
      }
    },
    resetState: state => {
      return { ...initialState };
    },
  },
});

export const {
  initType,
  setBasicData,
  setPhysicalData,
  setTattoData,
  setAccountData,
  setCompanyData,
  setTermData,
  resetState,
} = signUpSlice.actions;
export default signUpSlice.reducer;
