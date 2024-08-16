import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  SignUpInterface,
  MemberCreateInterface,
  TattooInterface,
} from '@/api/interface';

type Term = {
  id: number;
  agree: boolean;
};

type TermState = (Term | undefined)[];

interface SignUpStateInterface extends SignUpInterface {
  type: string;
  terms: TermState;
}

interface MemberSignUpStateInterface extends MemberCreateInterface {
  type: string;
  terms: (Term | undefined)[];
  tattoo: TattooInterface;
  hasTattoo: boolean;
  enteredTattoo: boolean;
  enteredAccount: boolean;
}

interface CompanySignUpStateInferface extends SignUpStateInterface {
  enteredName: boolean;
}

const initialState: SignUpStateInterface = {
  type: '',
  name: '',
  accountId: 0,
  terms: [],
};

const memberInitState: MemberSignUpStateInterface = {
  type: 'member',
  accountId: 0,
  name: '',
  sex: false,
  birthday: '',
  home: '',
  height: 0.0,
  weight: 0.0,
  phone: '',
  bank: '',
  accountNumber: '',
  enteredTattoo: false,
  hasTattoo: false,
  tattoo: {
    face: false,
    chest: false,
    arm: false,
    leg: false,
    shoulder: false,
    back: false,
    hand: false,
    feet: false,
  },
  enteredAccount: false,
  terms: [],
};

const companyInitState: CompanySignUpStateInferface = {
  type: 'company',
  accountId: 0,
  name: '',
  enteredName: false,
  terms: [],
};

type tattooNamesType = {
  [key in keyof TattooInterface]: string;
};

const tattooNames: tattooNamesType = {
  face: '얼굴',
  chest: '가슴',
  arm: '팔',
  leg: '다리',
  shoulder: '어깨',
  back: '등',
  hand: '손',
  feet: '발',
};

const isMemberSignUpState = (
  state: SignUpStateInterface,
): state is MemberSignUpStateInterface => state.type === 'member';

const isCompanySignUpState = (
  state: SignUpStateInterface,
): state is CompanySignUpStateInferface => state.type === 'company';

export { isMemberSignUpState, tattooNames, isCompanySignUpState };
export type { TermState };

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    initType: (state, action: PayloadAction<{ type: string }>) => {
      const type = action.payload.type;

      if (type === 'member') {
        return { ...memberInitState };
      }

      if (type === 'company') {
        return { ...companyInitState };
      }
    },
    setAccountId: (state, action: PayloadAction<number>) => {
      state.accountId = action.payload;
    },
    setBasicData: (
      state: SignUpStateInterface,
      action: PayloadAction<{
        name: string;
        phone?: string;
        sex?: number;
        birthday?: string;
        home?: string;
      }>,
    ) => {
      action.payload.name = action.payload.name;
      if (
        isMemberSignUpState(state) &&
        action.payload.home &&
        action.payload.birthday &&
        action.payload.phone
      ) {
        state.sex = action.payload.sex === 1 ? true : false;
        state.birthday = action.payload.birthday;
        state.phone = action.payload.phone;
        state.home = action.payload.home;
      }
    },
    setPhysicalData: (
      state: SignUpStateInterface,
      action: PayloadAction<{ height: number; weight: number }>,
    ) => {
      if (isMemberSignUpState(state)) {
        state.height = action.payload.height;
        state.weight = action.payload.weight;
      }
    },
    setTattooData: (
      state: SignUpStateInterface,
      action: PayloadAction<{ hasTattoo: boolean; tattoo: TattooInterface }>,
    ) => {
      if (isMemberSignUpState(state)) {
        state.enteredTattoo = true;
        state.hasTattoo = action.payload.hasTattoo;
        state.tattoo = action.payload.tattoo;
      }
    },
    setAccountData: (
      state: SignUpStateInterface,
      action: PayloadAction<{ bank: string; accountNumber: string }>,
    ) => {
      if (isMemberSignUpState(state)) {
        state.enteredAccount = true;
        state.bank = action.payload.bank;
        state.accountNumber = action.payload.accountNumber;
      }
    },
    setCompanyData: (
      state: SignUpStateInterface,
      action: PayloadAction<{ name: string }>,
    ) => {
      if (isCompanySignUpState(state)) {
        state.enteredName = true;
        state.name = action.payload.name;
      }
    },
    setTermData: (
      state: SignUpStateInterface,
      action: PayloadAction<TermState>,
    ) => {
      state.terms = action.payload;
    },
    resetState: state => {
      return { ...initialState };
    },
  },
});

export const {
  initType,
  setAccountId,
  setBasicData,
  setPhysicalData,
  setTattooData,
  setAccountData,
  setCompanyData,
  setTermData,
  resetState,
} = signUpSlice.actions;
export default signUpSlice.reducer;
