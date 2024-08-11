import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  SignUpInterface,
  MemberCreateInterface,
  MemberTattoInterface,
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
  tatto: MemberTattoInterface;
  hasTatto: boolean;
  enteredTatto: boolean;
  enteredAccount: boolean;
}

interface CompanySignUpStateInferface extends SignUpStateInterface {
  enteredName: boolean;
}

const initialState: SignUpStateInterface = {
  type: '',
  email: '',
  password: '',
  name: '',
  terms: [],
};

const memberInitState: MemberSignUpStateInterface = {
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
  bank: '',
  accountNumber: '',
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
    etc: '',
  },
  enteredAccount: false,
  terms: [],
};

const companyInitState: CompanySignUpStateInferface = {
  type: 'company',
  email: '',
  password: '',
  name: '',
  enteredName: false,
  terms: [],
};

type tattoNamesType = {
  [key in keyof MemberTattoInterface]: string;
};

const tattoNames: tattoNamesType = {
  face: '얼굴',
  chest: '가슴',
  arm: '팔',
  leg: '다리',
  shoulder: '어깨',
  back: '등',
  hand: '손',
  feet: '발',
  etc: '기타',
};

const isMemberSignUpState = (
  state: SignUpStateInterface,
): state is MemberSignUpStateInterface => state.type === 'member';

const isCompanySignUpState = (
  state: SignUpStateInterface,
): state is CompanySignUpStateInferface => state.type === 'company';

export { isMemberSignUpState, isCompanySignUpState, tattoNames };
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
    setBasicData: (
      state: SignUpStateInterface,
      action: PayloadAction<{
        email: string;
        password: string;
        name?: string;
        phone?: string;
        sex?: number;
        birthday?: string;
        home?: string;
      }>,
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      if (
        isMemberSignUpState(state) &&
        action.payload.name &&
        action.payload.home &&
        action.payload.birthday &&
        action.payload.phone
      ) {
        state.name = action.payload.name;
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
    setTattoData: (
      state: SignUpStateInterface,
      action: PayloadAction<{ hasTatto: boolean; tatto: MemberTattoInterface }>,
    ) => {
      if (isMemberSignUpState(state)) {
        state.enteredTatto = true;
        state.hasTatto = action.payload.hasTatto;
        state.tatto = action.payload.tatto;
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
  setBasicData,
  setPhysicalData,
  setTattoData,
  setAccountData,
  setCompanyData,
  setTermData,
  resetState,
} = signUpSlice.actions;
export default signUpSlice.reducer;
