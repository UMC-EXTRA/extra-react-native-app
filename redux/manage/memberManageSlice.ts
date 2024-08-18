import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MemberManageState {
  jobPostId: number;
  roleId: number;
}

const initialState: MemberManageState = {
  jobPostId: 0,
  roleId: 0,
};

const memberManageSlice = createSlice({
  name: 'memberManage',
  initialState,
  reducers: {
    setId: (
      state,
      action: PayloadAction<{ jobPostId: number; roleId: number }>,
    ) => {
      state.jobPostId = action.payload.jobPostId;
      state.roleId = action.payload.roleId;
    },
  },
});

export const { setId } = memberManageSlice.actions;
export default memberManageSlice.reducer;
