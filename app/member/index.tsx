import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { SafeContainer } from '@/components/Container';
import HomeHeader from '@/components/HomeHeader';
import { Router } from '@/scripts/router';
import { useEffect, useState } from 'react';
import { getMemberProfile } from '@/api/signController';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { initProfile, isMemberProfileState } from '@/redux/slice/profileSlice';

const onMessage = (data: MessageType) => {
  if (data.type === 'NAVIGATION_DETAIL') {
    Router.push({
      pathname: '/member/home/detail',
      params: {
        ...data.payload,
      },
    });
  }
  if (data.type === 'NAVIGATION_DATE') {
    Router.push({
      pathname: '/member/home/date',
      params: {
        ...data.payload,
      },
    });
  }
};

const HomeScreen = () => {
  const profile = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');

  useEffect(() => {
    if (profile.name === '') {
      getMemberProfile().then(res => {
        if (res !== null) {
          setName(res.name);

          dispatch(
            initProfile({
              name: res.name,
              info: {
                birthday: res.birthday,
                home: res.home,
                introduction: res.introduction,
                license: res.license,
                pros: res.pros,
                height: res.height,
                weight: res.weight,
                tattoo: res.tattoo,
              },
            }),
          );
        }
      });
    } else {
      if (isMemberProfileState(profile)) {
        setName(profile.name);
      }
    }
  }, []);

  return (
    <SafeContainer>
      <HomeHeader />
      {name && (
        <WebViewContainer
          onMessage={onMessage}
          dataForWebView={{
            type: 'POST_DATA',
            payload: {
              name: name,
            },
            version: '1.0',
          }}
        />
      )}
    </SafeContainer>
  );
};

export default HomeScreen;
