import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MemberManageState {
  jobPostId: number;
  roleId: number;
  title: string;
}

const initialState: MemberManageState = {
  jobPostId: 0,
  roleId: 0,
  title: '',
};

const memberManageSlice = createSlice({
  name: 'memberManage',
  initialState,
  reducers: {
    setId: (
      state,
      action: PayloadAction<{
        jobPostId: number;
        roleId: number;
      }>,
    ) => {
      state.jobPostId = action.payload.jobPostId;
      state.roleId = action.payload.roleId;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setId, setTitle } = memberManageSlice.actions;
export default memberManageSlice.reducer;
