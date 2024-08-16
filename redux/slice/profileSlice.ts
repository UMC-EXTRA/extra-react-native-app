import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Term = {
  id: number;
  title: string;
  content: string;
  agree: boolean;
  optional: boolean;
};

type TermState = (Term | undefined)[];

export type { TermState };

type SliceState = {
  type: string;
  email: string;
  name: string;
  requiredTerms: TermState;
  eventNoticeAgree: boolean;
  info?: object;
};

type Tattoo = {
  arm: boolean;
  back: boolean;
  chest: boolean;
  face: boolean;
  feet: boolean;
  hand: boolean;
  leg: boolean;
  shoulder: boolean;
  etc: string;
};

type MemberState = SliceState & {
  info: {
    tattoo: Tattoo;
    birthday: string;
    height: number;
    home: string;
    introduction: string;
    license: string;
    pros: string;
    sex: boolean;
    weight: number;
  };
};

type CompanyState = SliceState & {
  info: {
    url: string;
  };
};

const initialState: SliceState = {
  type: '',
  email: '',
  name: '',
  requiredTerms: [],
  eventNoticeAgree: false,
};

const memberInitState: MemberState = {
  type: 'member',
  email: '',
  name: '',
  requiredTerms: [],
  eventNoticeAgree: false,
  info: {
    birthday: '',
    home: '',
    introduction: '',
    license: '',
    pros: '',
    sex: true,
    height: 0,
    weight: 0,
    tattoo: {
      face: false,
      back: false,
      arm: false,
      leg: false,
      hand: false,
      shoulder: false,
      chest: false,
      feet: false,
      etc: '',
    },
  },
};

const companyInitState: CompanyState = {
  type: 'company',
  email: '',
  name: '',
  requiredTerms: [],
  eventNoticeAgree: false,
  info: {
    url: '',
  },
};

export const isMemberProfileState = (
  state: SliceState,
): state is MemberState => {
  return state.type === 'member';
};

export const isCompanyProfileState = (
  state: SliceState,
): state is MemberState => {
  return state.type === 'member';
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    initType: (state, action) => {
      if (action.payload === 'member') {
        return memberInitState;
      } else {
        return companyInitState;
      }
    },
    initEmail: (state, action) => {
      state.email = action.payload;
    },
    initProfile: (state, action) => {
      state.name = action.payload.name;
      state.info = action.payload.info;
    },
    initTerms: (state, action: PayloadAction<TermState>) => {
      action.payload
        .filter((term: any) => term.optional === false)
        .forEach((term: any) => {
          state.requiredTerms.push({
            id: term.id,
            title: term.title,
            content: term.content,
            agree: term.agree,
            optional: term.optional,
          });
        });
      state.eventNoticeAgree = action.payload[4]!.agree;
    },
  },
});

export const { initType, initTerms, initEmail, initProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
