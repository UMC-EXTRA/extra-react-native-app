const tattoNames = {
  face: '얼굴',
  chest: '가슴',
  arm: '팔',
  leg: '다리',
  shoulder: '어깨',
  back: '등',
  hand: '손',
  feet: '발',
  etc: '기타',
};

type TattoState = {
  face: boolean;
  chest: boolean;
  arm: boolean;
  leg: boolean;
  shoulder: boolean;
  back: boolean;
  hand: boolean;
  feet: boolean;
  etc: boolean;
};

type AccountState = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
};

type TermState = [
  {
    id: number;
    title: string;
    content: string;
    agree: boolean;
    optional: boolean;
  },
];

export type { TattoState, AccountState, TermState };
export default tattoNames;
