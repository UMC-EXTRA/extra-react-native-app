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
  requiredTerms: TermState;
  eventNoticeAgree: boolean;
};

const initialState: SliceState = {
  type: '',
  email: '',
  requiredTerms: [],
  eventNoticeAgree: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    initType: (state, action) => {
      state.type = action.payload;
    },
    initEmail: (state, action) => {
      state.email = action.payload;
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

export const { initType, initTerms, initEmail } = profileSlice.actions;
export default profileSlice.reducer;
