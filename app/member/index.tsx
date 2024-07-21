import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { getKeyHashAndroid } from '@react-native-kakao/core';
import SafeContainer from '@/components/SafeContainer';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

/*
  App first page
  - Select user type
*/
const MemberScreen = () => {
  return (
    <SafeContainer>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>
          어서오세요!{'\n'}원하시는 서비스를 선택해주세요
        </Text>
      </View>
      <View style={styles.linkContainer}>
        <TouchableHighlight
          style={styles.link}
          onPress={() =>
            router.push({
              pathname: '/member/login/[type]',
              params: { type: 'user' },
            })
          }
        >
          <Text style={styles.linkText}>보조출연자</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.link}
          onPress={() =>
            router.push({
              pathname: '/member/login/[type]',
              params: { type: 'admin' },
            })
          }
        >
          <Text style={styles.linkText}>관리자</Text>
        </TouchableHighlight>
      </View>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  mainTextContainer: {
    flex: 24,
    justifyContent: 'flex-end',
  },
  mainText: {
    fontFamily: 'Inter-ExtraBold',
    textAlign: 'center',
    fontSize: getSize(29),
    color: 'white',
    fontWeight: '900',
  },
  linkContainer: {
    flex: 76,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    width: '90%',
    height: getSize(50),
    backgroundColor: colors.highlight,
    borderRadius: getSize(10),
    marginBottom: getSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  linkText: {
    color: colors.text,
    fontSize: getSize(18),
    textAlign: 'center',
  },
});

export default MemberScreen;
