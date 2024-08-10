interface LoginInterface {
  email: string;
  password: string;
}

interface SignUpInterface extends LoginInterface {
  name: string;
}

interface MemberCreateInterface extends SignUpInterface {
  sex: boolean;
  phone: string;
  birthday: string;
  home: string;
  height: number;
  weight: number;
  bank: string;
  accountNumber: string;
}

interface MemberTattoInterface {
  face: boolean;
  chest: boolean;
  arm: boolean;
  leg: boolean;
  shoulder: boolean;
  back: boolean;
  hand: boolean;
  feet: boolean;
  etc: string;
}

interface MemberSignUpInterface {
  memberCreate: MemberCreateInterface;
  tattooCreate: MemberTattoInterface;
}

export {
  LoginInterface,
  SignUpInterface,
  MemberSignUpInterface,
  MemberCreateInterface,
  MemberTattoInterface,
};
