import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

import { BackLinkButton, NextLinkButton } from './ButtonComponents';
import { MainText } from '@/components/TextComponents';

import getSize from '@/scripts/getSize';
import colors from '@/constants/Colors';

import { isCompanyManageState } from '@/redux/manage/stateTypes';
import { setGlobalClockTime } from '@/redux/manage/manageSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

interface Props {
  show: boolean;
  setShow: () => void;
  text: string;
  style?: object;
  items: number[];
  type?: 'moon' | 'time';
  setValue: (value: number) => void;
}

const ToggleButton = ({
  show,
  setShow,
  text,
  style = {},
  items,
  type = 'time',
  setValue,
}: Props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.toggleButton, ...style }}
      onPress={setShow}
    >
      <View style={styles.toggleIcon}>
        <FontAwesome
          name={show ? 'angle-up' : 'angle-down'}
          size={getSize(20)}
          color="#fff"
        />
      </View>
      <MainText style={{ color: colors.highlight, width: getSize(30) }}>
        {text}
      </MainText>
      {show && (
        <View style={styles.itemContainer}>
          <ScrollView>
            {items.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.toggleItem}
                onPress={() => {
                  setValue(item);
                  setShow();
                }}
              >
                <MainText
                  style={{ fontSize: getSize(20), color: colors.highlight }}
                >
                  {type == 'moon' ? (item ? '오전' : '오후') : item}
                </MainText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </TouchableOpacity>
  );
};

interface SetTimeModalProps {
  setDisplay: (display: boolean) => void;
  type: string;
}

const SetTimeModal = ({ setDisplay, type }: SetTimeModalProps) => {
  const manage = useAppSelector(state => state.manage);
  const dispatch = useAppDispatch();

  const [moon, setMoon] = useState(true);
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);

  const [showIndex, setShowIndex] = useState(0);

  const moonArray = [1, 0];
  const hourArray = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteArray = Array.from({ length: 60 }, (_, i) => i);

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <MainText style={styles.title}>
          {type == 'in' && '출근'}
          {type == 'out' && '퇴근'} 시간
        </MainText>
        <View style={styles.divideBar} />
        <Image
          source={require('@/assets/images/icons/Add-Reminder.png')}
          style={styles.image}
        />
        <View style={styles.selectContainer}>
          <ToggleButton
            show={showIndex == 1}
            setShow={() => {
              showIndex !== 1 ? setShowIndex(1) : setShowIndex(0);
            }}
            text={moon ? '오전' : '오후'}
            items={moonArray}
            type="moon"
            setValue={(value: number) => setMoon(Boolean(value))}
          />
          <ToggleButton
            show={showIndex == 2}
            setShow={() => {
              showIndex !== 2 ? setShowIndex(2) : setShowIndex(0);
            }}
            text={`${hour < 10 ? '0' : ''}${hour}`}
            items={hourArray}
            setValue={(value: number) => setHour(value)}
          />
          <ToggleButton
            show={showIndex == 3}
            setShow={() => {
              showIndex !== 3 ? setShowIndex(3) : setShowIndex(0);
            }}
            text={`${minute < 10 ? '0' : ''}${minute}`}
            items={minuteArray}
            setValue={(value: number) => setMinute(value)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <BackLinkButton
            text="취소"
            onPress={() => {
              setDisplay(false);
            }}
            style={{
              width: getSize(100),
              height: getSize(40),
              borderRadius: getSize(10),
            }}
          />
          <NextLinkButton
            text="확인"
            onPress={() => {
              const time = `${moon ? hour : hour + 12}:${minute < 10 ? '0' : ''}${minute}`;
              if (isCompanyManageState(manage)) {
                dispatch(setGlobalClockTime({ type, time }));
              }
              setDisplay(false);
              router.push(`/company/manage/clock-${type}`);
            }}
            style={{
              width: getSize(100),
              height: getSize(40),
              borderRadius: getSize(10),
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    width: '100%',
    height: '110%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  modalContainer: {
    width: getSize(339),
    height: getSize(449),
    backgroundColor: colors.grayBackground,
    alignItems: 'center',
    borderRadius: getSize(30),
  },
  title: {
    fontSize: getSize(30),
    marginTop: getSize(80),
  },
  divideBar: {
    width: getSize(285),
    height: 2,
    backgroundColor: '#fff',
    marginVertical: getSize(40),
  },
  image: {
    width: getSize(80),
    height: getSize(80),
    alignSelf: 'center',
    marginBottom: getSize(30),
  },
  selectContainer: {
    width: getSize(269),
    height: getSize(48),
    borderRadius: getSize(15),
    backgroundColor: '#454348',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize(30),
    justifyContent: 'space-between',
    zIndex: 100,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleIcon: {
    width: getSize(20),
    height: getSize(20),
    backgroundColor: '#c2c2c2',
    borderRadius: getSize(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getSize(10),
  },
  itemContainer: {
    position: 'absolute',
    top: getSize(40),
    backgroundColor: '#454348',
    width: getSize(60),
    right: -getSize(15),
    borderRadius: getSize(5),
    maxHeight: getSize(200),
  },
  toggleItem: {
    width: '100%',
    height: getSize(40),
  },
  buttonContainer: {
    width: getSize(230),
    height: getSize(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getSize(30),
  },
});

export default SetTimeModal;
