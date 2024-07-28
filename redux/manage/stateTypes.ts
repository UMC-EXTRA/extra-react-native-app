interface ManageState {
  type: string;
  noticeId: number;
}

interface MemberManageState extends ManageState {}

type Member = {
  id: number;
  name: string;
  sex: boolean;
  role: string;
  age: number;
  clockIn: boolean;
  clockOut: boolean;
  clockInTime: string;
  clockOutTime: string;
  isConfirmed: boolean;
  inChat: boolean;
};

type Members = Member[];

interface CompanyManageState extends ManageState {
  clockInTime: string;
  clockOutTime: string;
  members: Members;
}

const isCompanyManageState = (
  state: ManageState,
): state is CompanyManageState => state.type === 'company';

export type { ManageState, CompanyManageState, Members };
export { isCompanyManageState };
