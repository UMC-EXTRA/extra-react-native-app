import Camera from '@/components/Camera';
import { useLocalSearchParams } from 'expo-router';
import { Router } from '@/scripts/router';

import { isCompanyManageState } from '@/redux/manage/stateTypes';
import { confirmClothes } from '@/redux/manage/manageSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

export default function CameraScreen() {
  const manage = useAppSelector(state => state.manage);
  const dispatch = useAppDispatch();

  const { memberId } = useLocalSearchParams();

  return (
    <Camera
      backLink="/company/manage/confirm-clothes"
      onConfirm={() => {
        if (isCompanyManageState(manage)) {
          dispatch(confirmClothes({ id: Number(memberId) }));
        }
        Router.navigate('/company/manage/confirm-clothes');
      }}
    />
  );
}
