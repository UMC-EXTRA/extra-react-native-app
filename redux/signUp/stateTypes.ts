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
  terms: TermState;
}

interface MemberSignUpState extends SignUpState {
  type: 'member';
  home: string;
  height: number;
  weight: number;
  enteredTatto: boolean;
  hasTatto: boolean;
  tatto: TattoState;
  enteredAccount: boolean;
  account: AccountState;
}

interface CompanySignUpState extends SignUpState {
  type: 'company';
  enteredCompany: boolean;
  company: string;
}

const isMemberSignUpState = (state: SignUpState): state is MemberSignUpState =>
  state.type === 'member';

const isCompanySignUpState = (
  state: SignUpState,
): state is CompanySignUpState => state.type === 'company';

export type {
  TattoState,
  AccountState,
  TermState,
  SignUpState,
  MemberSignUpState,
  CompanySignUpState,
};
export { tattoNames, isMemberSignUpState, isCompanySignUpState };
