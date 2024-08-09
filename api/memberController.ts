import axios from 'axios';

const SERVER_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}`;
const API_URL = SERVER_URL + '/api/v1/members';

export const signUp = async (memberData: object, tattoData: object) => {
  axios
    .post(API_URL + '/signup', {
      data: JSON.stringify({
        memberCreate: memberData,
        tattoCreate: tattoData,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
};
