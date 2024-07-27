import { createSlice } from '@reduxjs/toolkit';
import type { ManageState } from './stateTypes';

const initialState: ManageState = {
  noticeId: 0,
};

const manageSlice = createSlice({
  name: 'manage',
  initialState,
  reducers: {
    initManageState: (state, action) => {
      state = initialState;
      state.noticeId = action.payload.noticeId;
    },
  },
});

export const { initManageState } = manageSlice.actions;
export default manageSlice.reducer;
