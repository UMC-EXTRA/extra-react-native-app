import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  TattoState,
  AccountState,
  TermState,
  SignUpState,
  MemberSignUpState,
  CompanySignUpState,
} from './stateTypes';

const initialState: SignUpState = {
  type: '',
  email: '',
  password: '',
  name: '',
  sex: false,
  birthday: '',
  phone: '',
  terms: [],
};

const memberInitState: MemberSignUpState = {
  type: 'member',
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

const companyInitState: CompanySignUpState = {
  type: 'company',
  email: '',
  password: '',
  name: '',
  sex: false,
  birthday: '',
  phone: '',
  enteredCompany: false,
  company: '',
  terms: [],
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    initType: (state, action) => {
      if (action.payload === 'member') {
        return { ...memberInitState };
      }
      if (action.payload === 'company') {
        return { ...companyInitState };
      }
    },
    setBasicData: (
      state: SignUpState,
      action: PayloadAction<{
        email: string;
        name: string;
        sex: number;
        birthday: string;
        home?: string;
      }>,
    ) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.sex = action.payload.sex === 1 ? true : false;
      state.birthday = action.payload.birthday;
      if (state.type === 'member' && action.payload.home) {
        (state as MemberSignUpState).home = action.payload.home;
      }
    },
    setPhysicalData: (
      state,
      action: PayloadAction<{ height: number; weight: number }>,
    ) => {
      if (state.type === 'member') {
        (state as MemberSignUpState).height = action.payload.height;
        (state as MemberSignUpState).weight = action.payload.weight;
      }
    },
    setTattoData: (
      state,
      action: PayloadAction<{ hasTatto: boolean; tatto: TattoState }>,
    ) => {
      if (state.type === 'member') {
        (state as MemberSignUpState).enteredTatto = true;
        (state as MemberSignUpState).hasTatto = action.payload.hasTatto;
        (state as MemberSignUpState).tatto = action.payload.tatto;
      }
    },
    setAccountData: (state, action: PayloadAction<AccountState>) => {
      if (state.type === 'member') {
        (state as MemberSignUpState).enteredAccount = true;
        (state as MemberSignUpState).account = action.payload;
      }
    },
    setCompanyData: (state, action: PayloadAction<{ company: string }>) => {
      if (state.type === 'company') {
        (state as CompanySignUpState).enteredCompany = true;
        (state as CompanySignUpState).company = action.payload.company;
      }
    },
    setTermData: (state, action: PayloadAction<TermState>) => {
      state.terms = action.payload;
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
