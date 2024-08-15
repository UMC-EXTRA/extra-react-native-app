import Camera from '@/components/Camera';
import { useLocalSearchParams } from 'expo-router';
import { Router } from '@/scripts/router';

import { confirmClothes } from '@/redux/manage/companyManageSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

export default function CameraScreen() {
  const manage = useAppSelector(state => state.manage);
  const dispatch = useAppDispatch();

  const { memberId } = useLocalSearchParams();

  return (
    <Camera
      backLink="/company/manage/confirm-clothes"
      onConfirm={() => {
        dispatch(confirmClothes({ id: Number(memberId) }));
        Router.navigate('/company/manage/confirm-clothes');
      }}
    />
  );
}
