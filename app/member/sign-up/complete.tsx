import { View, Platform, StyleSheet, Text } from 'react-native';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { router } from 'expo-router';
import { useEffect } from 'react';

import getSize from '@/scripts/getSize';

import { resetState } from '@/redux/signUp/signUpSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

const Complete = () => {
  const type = useAppSelector(state => state.profile.type);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetState());
      router.replace(`/${type}`);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <Svg width="430" height="883" viewBox="0 0 430 1100" fill="none">
          <Path d="M215 -14V785H-107L215 -14Z" fill="#F5C001" />
          <Path d="M215 -14V785H537L215 -14Z" fill="#F5C001" />
          <Path
            d="M512 785.5C512 831.616 379.252 869 215.5 869C51.7476 869 -81 831.616 -81 785.5C-81 739.384 51.7476 702 215.5 702C379.252 702 512 739.384 512 785.5Z"
            fill="#F5C001"
          />
        </Svg>
      ) : (
        <Svg width="430" height="883" viewBox="0 0 430 1200" fill="none">
          <Path d="M215 -14V785H-107L215 -14Z" fill="#F5C001" />
          <Path d="M215 -14V785H537L215 -14Z" fill="#F5C001" />
          <Path
            d="M512 785.5C512 831.616 379.252 869 215.5 869C51.7476 869 -81 831.616 -81 785.5C-81 739.384 51.7476 702 215.5 702C379.252 702 512 739.384 512 785.5Z"
            fill="#F5C001"
          />
        </Svg>
      )}
      <Text style={styles.text}>
        회원가입이 완료되었어요!{'\n\n'}이제 EXTRA와 함께{'\n'}
        {type === 'user' ? '배우' : '감독'}님이 되어보세요 🤩
      </Text>
      <Svg
        style={{
          ...styles.footer,
          bottom: Platform.OS === 'ios' ? getSize(100) : getSize(40),
        }}
        width="600"
        height="300"
        viewBox="0 0 600 300"
      >
        <Ellipse cx="300" cy="150" rx="245" ry="83.5" fill="#FFDF6A" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Inter-ExtraBold',
    fontSize: getSize(30),
    fontWeight: '900',
    lineHeight: getSize(35),
    position: 'absolute',
    top: Platform.OS === 'ios' ? getSize(350) : getSize(400),
  },
  footer: {
    position: 'absolute',
  },
});

export default Complete;
