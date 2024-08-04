import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ManageState, CompanyManageState, Members } from './stateTypes';

const initialState: ManageState = {
  type: '',
  jobPostId: 0,
};

const companyInitState: CompanyManageState = {
  type: 'company',
  jobPostId: 0,
  members: [],
  clockInTime: '',
  clockOutTime: '',
};

const manageSlice = createSlice({
  name: 'manage',
  initialState,
  reducers: {
    initManageState: (state, action: PayloadAction<{ type: string }>) => {
      if (action.payload.type === 'company') {
        return { ...companyInitState };
      }
    },
    setJobPostId: (state, action: PayloadAction<number>) => {
      state.jobPostId = action.payload;
    },
    initMemberList: (state, action: PayloadAction<{ members: Members }>) => {
      if (state.type === 'company') {
        (state as CompanyManageState).members = action.payload.members;
      }
    },
    setGlobalClockTime: (
      state,
      action: PayloadAction<{ type: 'in' | 'out'; time: string }>,
    ) => {
      if (state.type === 'company') {
        if (action.payload.type === 'in') {
          (state as CompanyManageState).clockInTime = action.payload.time;
        } else if (action.payload.type === 'out') {
          (state as CompanyManageState).clockOutTime = action.payload.time;
        }
      }
    },
    setMemberClockTime: (
      state,
      action: PayloadAction<{ id: number; type: 'in' | 'out'; time: string }>,
    ) => {
      if (state.type === 'company') {
        const member = (state as CompanyManageState).members.find(
          member => member.id === action.payload.id,
        );
        if (member) {
          if (action.payload.type === 'in') {
            member.clockInTime = action.payload.time;
            member.clockIn = true;
          } else if (action.payload.type === 'out') {
            member.clockOutTime = action.payload.time;
            member.clockOut = true;
          }
        }
      }
    },
    confirmClothes: (state, action: PayloadAction<{ id: number }>) => {
      if (state.type === 'company') {
        const member = (state as CompanyManageState).members.find(
          member => member.id === action.payload.id,
        );
        if (member !== undefined) {
          member.isConfirmed = true;
        }
      }
    },
  },
});

export const {
  initManageState,
  setJobPostId,
  initMemberList,
  setGlobalClockTime,
  setMemberClockTime,
  confirmClothes,
} = manageSlice.actions;
export default manageSlice.reducer;
