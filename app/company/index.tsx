import WebViewContainer, { MessageType } from '@/components/WebViewContainer';
import { SafeContainer } from '@/components/Container';
import HomeHeader from '@/components/HomeHeader';
import { Router } from '@/scripts/router';
import { useState } from 'react';
import { View, Pressable } from 'react-native';
import getSize from '@/scripts/getSize';
import { TextWeight400, TextWeight600 } from '@/components/Theme/Text';

type HomeMessageType = MessageType & {
  payload: {
    uri: string;
  };
};

type ModalMessageType = MessageType & {
  payload: {
    date: {
      dateNum: string;
      dayOfWeek: string;
      month: string;
    };
  };
};

const HomeScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalURI, setModalURI] = useState('');

  const [date, setDate] = useState({
    month: '',
    date: '',
    day: '',
  });

  const onMessage = (data: MessageType) => {
    const typedData = data as HomeMessageType;
    if (typedData.type === 'NAVIGATION_DETAIL') {
      Router.push({
        pathname: '/company/home/detail',
        params: {
          ...typedData.payload,
          history: '/company',
        },
      });
    }

    if (typedData.type === 'MODAL_OPEN') {
      setOpenModal(true);
      setModalURI(typedData.payload.uri);
    }
  };

  return (
    <>
      <SafeContainer>
        <HomeHeader />
        <WebViewContainer uri="/company-home" onMessage={onMessage} />
      </SafeContainer>
      {openModal && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: getSize(47),
          }}
        >
          <Pressable
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }}
            onPress={() => {
              setOpenModal(false);
            }}
          />
          <View
            style={{
              width: getSize(400),
              height: getSize(618),
              backgroundColor: '#302e34',
              borderRadius: getSize(25),
              paddingTop: getSize(40),
            }}
          >
            <View
              style={{
                paddingHorizontal: getSize(21),
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: getSize(30),
                  marginLeft: getSize(6),
                }}
              >
                <TextWeight600
                  size={32}
                  spacing={0.32}
                  style={{
                    marginRight: getSize(27),
                  }}
                >
                  {date.date}
                </TextWeight600>
                <TextWeight600 size={20} spacing={0.2}>
                  {date.day}요일
                </TextWeight600>
              </View>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  height: 2,
                  marginBottom: getSize(28),
                }}
              >
                <View
                  style={{
                    width: getSize(12),
                    height: getSize(12),
                    borderRadius: getSize(6),
                    backgroundColor: '#fff',
                    position: 'absolute',
                    top: -getSize(5),
                    left: -getSize(5),
                  }}
                />
              </View>
              <View
                style={{
                  marginBottom: getSize(28),
                }}
              >
                <TextWeight400 size={15} spacing={0.15}>
                  {date.month}월 {date.date}일
                </TextWeight400>
              </View>
            </View>
            <WebViewContainer
              uri={modalURI}
              onMessage={(data: MessageType) => {
                if (data.type === 'POST_DATA') {
                  const typedData = data as ModalMessageType;
                  const { dateNum, dayOfWeek, month } = typedData.payload.date;
                  setDate({
                    month,
                    date: dateNum,
                    day: dayOfWeek,
                  });
                }
                if (data.type === 'NAVIGATION_DETAIL') {
                  Router.push({
                    pathname: '/company/home/detail',
                    params: {
                      ...data.payload,
                      history: '/company',
                    },
                  });
                }
              }}
              injectedJavaScript="document.body.style.backgroundColor = 'transparent';"
            />
          </View>
        </View>
      )}
    </>
  );
};

export default HomeScreen;
