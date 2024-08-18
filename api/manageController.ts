import {
  ApplicantInterface,
  AttandanceInfoInterface,
  CostumeInfoInterface,
} from './interface';

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

type CostumeImageInterface = {
  explain: {
    imageExplain: string;
  };
  image: string;
};

export const uploadCostumeImage = async (
  roleId: number,
  data: CostumeImageInterface,
): Promise<boolean> => {
  try {
    const res = await Utils.requestPostFetch(
      COSTUME_API_URL + 'roles/' + roleId,
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

type UpdateCostumeImageInterface = CostumeImageInterface & {
  explain: {
    imageChange: boolean;
  };
};

export const updateCostumeImage = async (
  boardId: number,
  data: UpdateCostumeImageInterface,
): Promise<boolean> => {
  try {
    const res = await Utils.requestPutFetch(
      COSTUME_API_URL + boardId + '/members',
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
