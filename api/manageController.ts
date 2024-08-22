import {
  ApplicantInterface,
  AttandanceInfoInterface,
  CostumeInfoInterface,
} from './interface';

import axios from 'axios';

import * as Utils from './utils';

const APPLICANT_API_URL = 'application-request/';
const ATTENDANCE_API_URL = 'attendance-management/';
const COSTUME_API_URL = `costumeapprovalboards/`;

export const getApplicantsByRoleId = async (
  roleId: number,
  page: number,
): Promise<ApplicantInterface[] | null> => {
  try {
    const res = await Utils.requestGetFetch(
      APPLICANT_API_URL + 'company/roles/' + roleId + '/members?page=' + page,
    );

    if (res !== null) {
      if (res.status === 200) {
        return res.json();
      }
    }
  } catch (err) {
    console.error(err);
  }

  return null;
};

export const getAttendanceInfoListByJobPostId = async (
  jobPostId: number,
  page?: number,
  name?: string,
): Promise<AttandanceInfoInterface[] | null> => {
  try {
    const params = {
      size: '10',
    };

    params['page'] = page ? page : '0';
    if (name !== undefined) {
      params['name'] = name;
    }

    const query = new URLSearchParams(params).toString();
    const URL =
      ATTENDANCE_API_URL +
      'company/jobposts/' +
      jobPostId +
      '/members?' +
      query;
    const res = await Utils.requestGetFetch(URL);

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
  return null;
};

type Attendance = {
  memberName: string;
  memberBirthday: string;
};

export const setAttendance = async (
  jobPostId: number,
  data: Attendance,
): Promise<boolean> => {
  try {
    const res = await Utils.requestPostFetch(
      ATTENDANCE_API_URL + 'company/jobposts/' + jobPostId + '/meal-count',
      data,
    );

    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }

  return false;
};

type Clock = Attendance & {
  time: string;
};

export const setClock = async (
  jobPostId: number,
  type: 'in' | 'out',
  data: Clock,
): Promise<boolean> => {
  try {
    const res = await Utils.requestPostFetch(
      ATTENDANCE_API_URL + 'company/jobposts/' + jobPostId + '/clock-' + type,
      data,
    );

    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }

  return false;
};

export const getCostumeInfoListByRoleId = async (
  roleId: number,
  page: number,
  name?: string,
): Promise<CostumeInfoInterface[] | null> => {
  try {
    const params = {
      page: `${page}`,
    };

    if (name !== undefined) {
      params['name'] = name;
    }

    let URL = COSTUME_API_URL + '/roles' + roleId;
    URL += '?' + new URLSearchParams(params).toString();

    const res = await Utils.requestGetFetch(URL);

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }

  return null;
};

export const getCostumeBoardIdByRoleId = async (
  roleId: number,
): Promise<object | null> => {
  try {
    const res = await Utils.requestGetFetch(
      COSTUME_API_URL + 'member/roles/' + roleId,
    );

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
};

export const applyCostumeByBoardId = async (
  boardId: number,
): Promise<boolean> => {
  try {
    const res = await Utils.requestPostFetch(
      COSTUME_API_URL + boardId + '/companies',
      {
        costume_approve: 'APPLIED',
      },
    );

    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }

  return false;
};

type CostumeInterface = {
  image: string;
  explain: {
    imageExplain: string;
  };
};

export const getRoleInfoByRoleId = async (
  jobPostId: number,
  roleId: number,
) => {
  try {
    const res = await Utils.requestGetFetch(
      'jobposts/' + jobPostId + '/roles/' + roleId,
    );

    console.log(res);

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }

  return null;
};

export const uploadCostumeImage = async (
  roleId: number,
  data: FormData,
): Promise<boolean> => {
  try {
    const token = await Utils.getToken();

    console.log(data);

    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_SERVER_URL}/api/v1/` +
        COSTUME_API_URL +
        'roles/' +
        roleId,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token.accessToken}`,
        },
      },
    );

    // const res = await Utils.requestPostFetch(
    //   COSTUME_API_URL + 'roles/' + roleId,
    //   data,
    // );

    console.log(res);

    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }

  return false;
};

type UpdateCostumeInterface = CostumeInterface & {
  explain: {
    imageChange: boolean;
  };
};

export const updateCostumeImage = async (
  boardId: number,
  data: UpdateCostumeInterface,
): Promise<boolean> => {
  try {
    // const token = await Utils.getToken();

    // const res = await fetch(
    //   `${process.env.EXPO_PUBLIC_SERVER_URL}/api/v1/` +
    //     COSTUME_API_URL +
    //     boardId +
    //     '/members',
    //   {
    //     method: 'PUT',
    //     headers: {
    //       accept: '*/*',
    //       'Content-Type': 'multipart/form-data',
    //       Authorization: `Bearer ${token.accessToken}`,
    //     },
    //     body: data,
    //   },
    // );

    const res = await Utils.requestPutFetch(
      COSTUME_API_URL + boardId + '/members',
      data,
    );

    console.log(res);

    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }

  return false;
};
