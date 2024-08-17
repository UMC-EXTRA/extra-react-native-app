import { ApplicantInterface, AttandanceInfoInterface } from './interface';

import * as Utils from './utils';

const APPLICANT_API_URL = 'application-request/';
const ATTENDANCE_API_URL = 'attendance-management/';

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
  job_post_id: number,
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
      job_post_id +
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
  job_post_id: number,
  data: Attendance,
): Promise<boolean> => {
  try {
    const res = await Utils.requestPostFetch(
      ATTENDANCE_API_URL +
        'attendance-management/company/jobposts/' +
        job_post_id +
        '/meal-count',
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
  job_post_id: number,
  type: 'in' | 'out',
  data: Clock,
): Promise<boolean> => {
  try {
    const res = await Utils.requestPostFetch(
      ATTENDANCE_API_URL +
        'attendance-management/company/jobposts/' +
        job_post_id +
        '/clock-' +
        type,
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
