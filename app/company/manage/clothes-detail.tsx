import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import colors from '@/constants/Colors';
import { Router } from '@/scripts/router';
import { BackHeaderContainer } from '@/components/Container';
import getSize from '@/scripts/getSize';
import { TextWeight900, weight900 } from '@/components/Theme/Text';
import { useLocalSearchParams } from 'expo-router';
import { useAppDispatch } from '@/redux/hooks';
import { applyCostume } from '@/redux/manage/companyManageSlice';
import { applyCostumeByBoardId } from '@/api/manageController';

const ClothesScreen = () => {
  const { id, index, imageUrl, status, roleName, season } =
    useLocalSearchParams();
  const dispatch = useAppDispatch();

  return (
    <BackHeaderContainer
      title="의상"
      onPress={() => Router.navigate('/member/manage/detail')}
    >
      {/* 의상 페이지 상단 */}
      <View
        style={{
          marginHorizontal: 'auto',
          width: getSize(392),
          height: getSize(226),
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: '#2A2A2A',
          borderStyle: 'solid',
          borderWidth: 1,
        }}
      >
        <View style={styles.textContainer}>
          <View style={styles.name}>
            <Text style={styles.text}>역할: </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>{roleName}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.name}>
            <Text style={styles.text}>계절: </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>{season}</Text>
          </View>
        </View>
      </View>
      {/* 의상 페이지 하단 */}

      {/* 하단 header */}
      <View
        style={{
          marginHorizontal: getSize(50),
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: getSize(20),
          marginBottom: getSize(30),
        }}
      >
        <TextWeight900 size={16}>의상등록</TextWeight900>
      </View>

      {/* 이미지 section */}
      <View style={{ marginHorizontal: getSize(49) }}>
        {imageUrl !== null ? (
          <TouchableOpacity
            onPress={() => {
              Router.push({
                pathname: '/company/manage/clothes-preview',
                params: {
                  uri: imageUrl,
                  status: Number(status === 'APPLIED'),
                },
              });
            }}
            style={{
              width: getSize(104),
              height: getSize(158),
            }}
          >
            <LinearGradient
              colors={
                status === 'APPLIED'
                  ? ['#fff', colors.highlight]
                  : ['#656565', '#656565']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: getSize(104),
                height: getSize(158),
                borderRadius: getSize(11),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: getSize(100),
                  height: getSize(154),
                  borderRadius: getSize(10),
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: `${imageUrl}` }}
                  style={{
                    minWidth: getSize(100),
                    height: getSize(154),
                  }}
                />
                {status !== 'APPLIED' && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: 'rgba(0, 0, 0, .5)',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: getSize(104),
              height: getSize(158),
              borderRadius: getSize(11),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#2C2C2C',
            }}
          >
            <TextWeight900 style={{ color: '#6D6D6D' }}>
              이미지 없음
            </TextWeight900>
          </View>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: getSize(74),
          alignItems: 'center',
          left: 0,
          width: '100%',
        }}
      >
        <TouchableOpacity
          style={{
            width: getSize(222),
            height: getSize(55),
            borderRadius: getSize(10),
            backgroundColor: '#2C2C2C',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          disabled={imageUrl === null || status === 'APPLIED'}
          onPress={() => {
            dispatch(
              applyCostume({
                roleIndex: Number(index[0]),
                costumeIndex: Number(index[1]),
              }),
            );
            applyCostumeByBoardId(Number(id)).then(res => {
              if (res) {
                Router.push({
                  pathname: '/company/manage/clothes',
                });
              }
            });
          }}
        >
          <TextWeight900 style={{ color: '#6D6D6D' }}>
            {status === 'APPLIED' ? '승인완료' : '승인하기'}
          </TextWeight900>
        </TouchableOpacity>
      </View>
    </BackHeaderContainer>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    height: getSize(30),
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: getSize(20),
  },
  text: {
    ...weight900,
    fontSize: getSize(16),
    letterSpacing: 0.16,
  },
  name: {
    width: getSize(70),
    alignItems: 'flex-end',
  },
  content: {
    marginLeft: 10,
    width: getSize(109),
    alignItems: 'center',
    borderBottomColor: '#585858',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});

export default ClothesScreen;
