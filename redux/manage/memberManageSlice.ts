import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MemberManageState {
  jobPostId: number;
}

const initialState: MemberManageState = {
  jobPostId: 0,
};

const memberManageSlice = createSlice({
  name: 'memberManage',
  initialState,
  reducers: {
    setJobPostId: (state, action: PayloadAction<number>) => {
      state.jobPostId = action.payload;
    },
  },
});

export const { setJobPostId } = memberManageSlice.actions;
export default memberManageSlice.reducer;
