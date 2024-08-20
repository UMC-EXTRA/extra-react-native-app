import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { SafeContainer } from '@/components/Container';
import { Router } from '@/scripts/router';
import {
  initManage,
  setJobPostId,
  setRoleData,
} from '@/redux/manage/companyManageSlice';
import { useAppDispatch } from '@/redux/hooks';

const NoticeScreen = () => {
  const dispatch = useAppDispatch();

  const onMessage = (data: MessageType) => {
    if (data.type === 'NAVIGATION_ADD_NOTICE') {
      Router.push({
        pathname: '/company/notice/add',
        params: {
          ...data.payload,
        },
      });
    }
    if (data.type === 'NAVIGATION_MANAGE') {
      const typedData = data as MessageType & {
        payload: {
          jobPostId: number;
          roleIdList: number[];
          roleNameList: string[];
          seasonList: string[];
        };
      };
      dispatch(initManage());
      dispatch(setJobPostId(typedData.payload.jobPostId));
      dispatch(
        setRoleData({
          roleIdList: typedData.payload.roleIdList,
          roleNameList: typedData.payload.roleNameList,
          seasonList: typedData.payload.seasonList,
        }),
      );

      Router.push('/company/manage/detail');
    }
    if (data.type === 'NAVIGATION_DETAIL') {
      Router.push({
        pathname: '/company/home/detail',
        params: {
          ...data.payload,
          history: '/company/notice',
        },
      });
    }
  };

  return (
    <SafeContainer>
      <WebViewContainer uri="/manager-dashboard" onMessage={onMessage} />
    </SafeContainer>
  );
};

export default NoticeScreen;
