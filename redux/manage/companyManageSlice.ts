import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicantInterface } from '@/api/interface';

type Member = {
  id: number;
  name: string;
  sex: boolean;
  role: string;
  age: number;
  clockIn: boolean;
  clockOut: boolean;
  clockInTime: string;
  clockOutTime: string;
  isConfirmed: boolean;
  inChat: boolean;
};

type Members = Member[];

export type { Members };

type Applicants = ApplicantInterface[];

interface CompanyManageState {
  jobPostId: number;
  clockInTime: string;
  clockOutTime: string;
  members: Members;
  roleIdList: number[];
  roleNameList: string[];
  roleApplicantList: Applicants[];
}

const initialState: CompanyManageState = {
  jobPostId: 0,
  members: [],
  clockInTime: '',
  clockOutTime: '',
  roleIdList: [],
  roleNameList: [],
  roleApplicantList: [],
};

const companyManageSlice = createSlice({
  name: 'companyManage',
  initialState,
  reducers: {
    setJobPostId: (state, action: PayloadAction<number>) => {
      state.jobPostId = action.payload;
    },
    setRoleData: (
      state,
      action: PayloadAction<{ roleIdList: number[]; roleNameList: string[] }>,
    ) => {
      state.roleIdList = action.payload.roleIdList;
      state.roleNameList = action.payload.roleNameList;
    },
    setRoleApplicantData: (
      state,
      action: PayloadAction<ApplicantInterface[][]>,
    ) => {
      state.roleApplicantList = action.payload;
    },
    initMemberList: (state, action: PayloadAction<{ members: Members }>) => {
      state.members = action.payload.members;
    },
    setGlobalClockTime: (
      state,
      action: PayloadAction<{ type: 'in' | 'out'; time: string }>,
    ) => {
      if (action.payload.type === 'in') {
        state.clockInTime = action.payload.time;
      } else if (action.payload.type === 'out') {
        state.clockOutTime = action.payload.time;
      }
    },
    setMemberClockTime: (
      state,
      action: PayloadAction<{ id: number; type: 'in' | 'out'; time: string }>,
    ) => {
      const member = state.members.find(
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
    },
    confirmClothes: (state, action: PayloadAction<{ id: number }>) => {
      const member = state.members.find(
        member => member.id === action.payload.id,
      );
      if (member !== undefined) {
        member.isConfirmed = true;
      }
    },
  },
});

export const {
  setJobPostId,
  initMemberList,
  setRoleData,
  setRoleApplicantData,
  setGlobalClockTime,
  setMemberClockTime,
  confirmClothes,
} = companyManageSlice.actions;
export default companyManageSlice.reducer;
