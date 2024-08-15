import { ApplicantInterface } from './interface';

type Applicants = ApplicantInterface[];

export const dummyApplicantList: Applicants[] = [
  [
    {
      id: 1,
      applyStatus: 'APPROVED',
      memberId: 1,
      name: '아무개',
    },
    {
      id: 2,
      applyStatus: 'APPLIED',
      memberId: 2,
      name: '이름0',
    },
  ],
  [
    {
      id: 3,
      applyStatus: 'REJECTED',
      memberId: 3,
      name: '김철수',
    },
    {
      id: 4,
      applyStatus: 'APPROVED',
      memberId: 4,
      name: '박영희',
    },
  ],
  [
    {
      id: 5,
      applyStatus: 'APPLIED',
      memberId: 5,
      name: '이순신',
    },
    {
      id: 6,
      applyStatus: 'APPROVED',
      memberId: 6,
      name: '홍길동',
    },
  ],
  [
    {
      id: 7,
      applyStatus: 'REJECTED',
      memberId: 7,
      name: '유관순',
    },
    {
      id: 8,
      applyStatus: 'APPLIED',
      memberId: 8,
      name: '안중근',
    },
  ],
  [
    {
      id: 9,
      applyStatus: 'APPROVED',
      memberId: 9,
      name: '강감찬',
    },
    {
      id: 10,
      applyStatus: 'REJECTED',
      memberId: 10,
      name: '을지문덕',
    },
  ],
];
