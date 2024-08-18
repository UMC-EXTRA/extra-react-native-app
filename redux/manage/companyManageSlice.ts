import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ApplicantInterface,
  AttandanceInfoInterface,
  CostumeInfoInterface,
} from '@/api/interface';

type Applicants = ApplicantInterface[];
type CostumeInfo = CostumeInfoInterface[];

interface CompanyManageState {
  jobPostId: number;
  page: number;
  clockInTime: string;
  clockOutTime: string;
  roleIdList: number[];
  roleNameList: string[];
  seasonList: string[];
  roleApplicantList: Applicants[];
  attandanceInfoList: AttandanceInfoInterface[];
  costumeInfoList: CostumeInfo[];
}

const initialState: CompanyManageState = {
  jobPostId: 0,
  page: -1,
  clockInTime: '',
  clockOutTime: '',
  roleIdList: [],
  roleNameList: [],
  seasonList: [],
  roleApplicantList: [],
  attandanceInfoList: [],
  costumeInfoList: [],
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
      action: PayloadAction<{
        roleIdList: number[];
        roleNameList: string[];
        seasonList: string[];
      }>,
    ) => {
      state.roleIdList = action.payload.roleIdList;
      state.roleNameList = action.payload.roleNameList;
      state.seasonList = action.payload.seasonList;
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
    setCostumeInfoData: (
      state,
      action: PayloadAction<{
        index: number;
        data: CostumeInfoInterface[];
        reset: boolean;
      }>,
    ) => {
      if (action.payload.reset) {
        state.costumeInfoList[action.payload.index] = [];
      }

      if (state.costumeInfoList[action.payload.index] === undefined) {
        state.costumeInfoList.push(action.payload.data);
      } else {
        state.costumeInfoList[action.payload.index] = [
          ...state.costumeInfoList[action.payload.index],
          ...action.payload.data,
        ];
      }
    },
    applyCostume: (
      state,
      action: PayloadAction<{ roleIndex: number; costumeIndex: number }>,
    ) => {
      state.costumeInfoList[action.payload.roleIndex][
        action.payload.costumeIndex
      ].costume_approve = 'APPLIED';
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
  setCostumeInfoData,
  setGlobalClockTime,
  applyCostume,
} = companyManageSlice.actions;
export default companyManageSlice.reducer;
