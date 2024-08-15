import { ApplicantInterface } from './interface';

import * as Utils from './utils';

const SERVER_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}`;
const API_URL = SERVER_URL + '/api/v1/';
const APPLICANT_API_URL = API_URL + 'application-request/';

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
