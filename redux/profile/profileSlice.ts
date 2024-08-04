import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TermState } from './stateTypes';

type SliceState = {
  type: string;
  requiredTerms: TermState;
  eventNoticeAgree: boolean;
};

const initialState: SliceState = {
  type: '',
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

export const { initType, initTerms } = profileSlice.actions;
export default profileSlice.reducer;
