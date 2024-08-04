import { useMemo } from 'react';
import { TouchableOpacity, ScrollView, Alert } from 'react-native';

import type { SettingListType } from '@/components/SettingComponents';
import {
  SettingContainer,
  SettingElement,
} from '@/components/SettingComponents';
import { TextWeight600 } from '@/components/Theme/Text';
import { ToggleButton } from '@/components/Theme/Button';
import getSize from '@/scripts/getSize';
import { Router } from '@/scripts/router';

import { useAppSelector } from '@/redux/hooks';

import { logout } from '@/scripts/tokenUtils';

const SettingsScreen = () => {
  const type = useAppSelector(state => state.profile.type);
  const email = 'abc123@naver.com';

  const settingList: SettingListType = useMemo(() => {
    return [
      {
        title: '계정 정보',
        element: [
          {
            title: '연동 계정',
            children: <TextWeight600 size={16}>Kakao</TextWeight600>,
          },
          {
            title: email,
            children: (
              <TouchableOpacity
                style={{
                  width: getSize(57),
                  height: getSize(26),
                  borderRadius: getSize(20),
                  backgroundColor: '#B6B5B4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  Alert.alert(
                    '로그아웃',
                    '로그아웃 하시겠습니까?',
                    [
                      {
                        text: '취소',
                        style: 'cancel',
                      },
                      {
                        text: '확인',
                        onPress: () => {
                          Alert.alert(
                            '로그아웃 되었습니다.',
                            '',
                            [
                              {
                                text: '확인',
                                onPress: () => {
                                  logout();
                                },
                              },
                            ],
                            { cancelable: false },
                          );
                        },
                      },
                    ],
                    { cancelable: false },
                  );
                }}
              >
                <TextWeight600 size={12} spacing={0.12}>
                  로그아웃
                </TextWeight600>
              </TouchableOpacity>
            ),
          },
        ],
      },
      {
        title: '알림 설정',
        element: [
          {
            title: '추천 공고 알림',
            children: <ToggleButton initValue={true} onChange={value => {}} />,
          },
          {
            title: '마케팅 및 이벤트 알림',
            children: <ToggleButton initValue={true} onChange={value => {}} />,
          },
        ],
      },
      {
        title: '이용 약관',
        element: [
          {
            title: '이용 약관',
            onPress: () => {},
          },
          {
            title: '개인정보처리방침',
            onPress: () => {},
          },
          {
            title: '위치서비스 이용약관',
            onPress: () => {},
          },
        ],
      },
      {
        title: '고객 센터',
        element: [
          {
            title: '회사 소개',
            onPress: () => {},
          },
          {
            title: '공지사항 및 이벤트',
            onPress: () => {},
          },
          {
            title: '고객센터',
            onPress: () => {},
          },
        ],
      },
      {
        title: '버전 정보',
        element: [
          {
            title: '0.2.2',
          },
        ],
      },
    ];
  }, []);

  return (
    <SettingContainer title="설정" onPress={() => Router.navigate('/company')}>
      <ScrollView contentContainerStyle={{ paddingBottom: getSize(30) }}>
        {settingList.map((setting, index) => (
          <SettingElement
            key={index}
            title={setting.title}
            element={setting.element}
            style={{
              ...(index > 0 && { marginTop: getSize(26) }),
            }}
          />
        ))}
      </ScrollView>
    </SettingContainer>
  );
};

export default SettingsScreen;
