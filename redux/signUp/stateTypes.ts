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

type Term = {
  id: number;
  agree: boolean;
};

type TermState = (Term | undefined)[];

interface SignUpState {
  type: string;
  email: string;
  password: string;
  name: string;
  sex: boolean;
  birthday: string;
  phone: string;
}

interface UserState extends SignUpState {
  type: 'user';
  home: string;
  height: number;
  weight: number;
  enteredTatto: boolean;
  hasTatto: boolean;
  tatto: TattoState;
  enteredAccount: boolean;
  account: AccountState;
  terms: TermState;
}

interface AdminState extends SignUpState {
  type: 'admin';
  enteredCompany: boolean;
  company: string;
}

const isUserState = (state: SignUpState): state is UserState =>
  state.type === 'user';

const isAdminState = (state: SignUpState): state is AdminState =>
  state.type === 'admin';

export type {
  TattoState,
  AccountState,
  TermState,
  SignUpState,
  UserState,
  AdminState,
};
export { tattoNames, isUserState, isAdminState };
