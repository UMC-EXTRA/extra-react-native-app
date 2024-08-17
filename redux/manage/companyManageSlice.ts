import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicantInterface, AttandanceInfoInterface } from '@/api/interface';

type Applicants = ApplicantInterface[];

interface CompanyManageState {
  jobPostId: number;
  page: number;
  clockInTime: string;
  clockOutTime: string;
  roleIdList: number[];
  roleNameList: string[];
  roleApplicantList: Applicants[];
  attandanceInfoList: AttandanceInfoInterface[];
}

const initialState: CompanyManageState = {
  jobPostId: 0,
  page: -1,
  clockInTime: '',
  clockOutTime: '',
  roleIdList: [],
  roleNameList: [],
  roleApplicantList: [],
  attandanceInfoList: [],
};

const companyManageSlice = createSlice({
  name: 'companyManage',
  initialState,
  reducers: {
    initManage: state => {
      return initialState;
    },
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
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRoleApplicantData: (
      state,
      action: PayloadAction<{ index: number; data: ApplicantInterface[] }>,
    ) => {
      if (state.roleApplicantList[action.payload.index] === undefined) {
        state.roleApplicantList.push(action.payload.data);
      } else {
        state.roleApplicantList[action.payload.index] = [
          ...state.roleApplicantList[action.payload.index],
          ...action.payload.data,
        ];
      }
    },
    setAttendanceInfoList: (
      state,
      action: PayloadAction<AttandanceInfoInterface[]>,
    ) => {
      state.attandanceInfoList = action.payload;
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
  },
});

export const {
  initManage,
  setJobPostId,
  setRoleData,
  setPage,
  setAttendanceInfoList,
  setRoleApplicantData,
  setGlobalClockTime,
} = companyManageSlice.actions;
export default companyManageSlice.reducer;
