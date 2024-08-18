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

interface MemberSignUpInterface extends MemberCreateInterface {
  accountId: number;
  tattoo: TattooInterface;
}

interface ApplicantInterface {
  id: number;
  memberId: number;
  name: string;
  applyStatus: string;
}

interface AttandanceInfoInterface {
  id: number;
  memberId: number;
  memberName: string;
  roleName: string;
  isAttended: boolean;
}

interface CostumeInfoInterface {
  id: number;
  member_name: string;
  imageUrl: string;
  costume_approve: 'APPLIED' | 'APPROVED';
}

export {
  LoginInterface,
  SignUpInterface,
  MemberSignUpInterface,
  MemberCreateInterface,
  TattooInterface,
  ApplicantInterface,
  AttandanceInfoInterface,
  CostumeInfoInterface,
};
