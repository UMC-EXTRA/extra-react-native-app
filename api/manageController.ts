import { ApplicantInterface, AttendanceMembersInterface } from './interface';

import * as Utils from './utils';

const APPLICANT_API_URL = 'application-request/';
const ATTENDANCE_API_URL = 'attendance-management/';

export const getApplicantsByRoleId = async (
  roleId: number,
): Promise<ApplicantInterface[] | null> => {
  try {
    const res = await Utils.requestGetFetch(
      APPLICANT_API_URL + 'company/roles/' + roleId + '/members?page=0',
    );

    if (res !== null) {
      if (res.status === 200) {
        return res.json();
      } else {
        // console.log(res);
      }
    }
  } catch (err) {
    console.error(err);
  }

  return null;
};

export const getAttendanceMembersByJobPostId = async (
  job_post_id: number,
  page: number,
  sort: boolean,
): Promise<AttendanceMembersInterface[] | null> => {
  try {
    const sorting = sort === true ? 'asc' : 'desc';
    const res = await Utils.requestGetFetch(
      ATTENDANCE_API_URL +
        'company/job-posts/' +
        job_post_id +
        '/members?page=' +
        page +
        '&sort=' +
        sorting,
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
