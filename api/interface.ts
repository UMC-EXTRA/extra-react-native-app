interface LoginInterface {
  email: string;
  password: string;
}

interface SignUpInterface {
  name: string;
  accountId: number;
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

interface TattooInterface {
  face: boolean;
  chest: boolean;
  arm: boolean;
  leg: boolean;
  shoulder: boolean;
  back: boolean;
  hand: boolean;
  feet: boolean;
}

interface MemberSignUpInterface {
  memberCreate: MemberCreateInterface;
  tattooCreate: TattooInterface;
}

interface ApplicantInterface {
  id: number;
  memberId: number;
  name: string;
  applyStatus: string;
}

interface AttendanceMembersInterface {
  id: number;
  memberId: number;
  memberName: string;
  roleName: string;
  isAttended: boolean;
}

export {
  LoginInterface,
  SignUpInterface,
  MemberSignUpInterface,
  MemberCreateInterface,
  TattooInterface,
  ApplicantInterface,
  AttendanceMembersInterface,
};
