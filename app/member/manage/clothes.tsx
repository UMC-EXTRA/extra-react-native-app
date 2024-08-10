import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

import colors from '@/constants/Colors';
import { Router } from '@/scripts/router';
import { BackHeaderContainer } from '@/components/Container';
import getSize from '@/scripts/getSize';
import {
  TextWeight400,
  TextWeight900,
  weight900,
} from '@/components/Theme/Text';

const ClothesScreen = () => {
  const [data, setData] = useState({
    role: '',
    season: '',
    description: '',
  });
  const [imageData, setImageData] = useState({
    uri: '',
    status: false,
  });
  const [editable, setEditable] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageData({ uri: result.assets[0].uri, status: false });
    }
  };

  useEffect(() => {
    setData({
      role: '형사',
      season: '겨울',
      description: '회색옷',
    });
  }, []);

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
            <Text style={styles.text}>{data.role}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.name}>
            <Text style={styles.text}>계절: </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>{data.season}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.name}>
            <Text style={styles.text}>상세설명: </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>{data.description}</Text>
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
        <TouchableOpacity onPress={() => setEditable(!editable)}>
          <TextWeight900
            size={15}
            spacing={0.15}
            style={{ textDecorationLine: 'underline', color: '#979797' }}
          >
            편집
          </TextWeight900>
        </TouchableOpacity>
      </View>

      {/* 이미지 section */}
      <View style={{ marginHorizontal: getSize(49) }}>
        {imageData.uri ? (
          <TouchableOpacity
            onPress={() =>
              editable
                ? (setImageData({ uri: '', status: false }), setEditable(false))
                : Router.push({
                    pathname: '/member/manage/clothes-preview',
                    params: {
                      uri: imageData.uri,
                      status: Number(imageData.status),
                    },
                  })
            }
            style={{
              width: getSize(104),
              height: getSize(158),
            }}
          >
            {editable && (
              <View
                style={{
                  width: getSize(30),
                  height: getSize(30),
                  backgroundColor: 'red',
                  borderRadius: getSize(15),
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: getSize(-10),
                  top: getSize(-10),
                  zIndex: 10000,
                }}
              >
                <TextWeight400 size={30} height={30}>
                  -
                </TextWeight400>
              </View>
            )}
            <LinearGradient
              colors={
                imageData.status
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
                  source={{ uri: imageData.uri }}
                  style={{
                    minWidth: getSize(100),
                    height: getSize(154),
                  }}
                />
                {!imageData.status && (
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
          <TouchableOpacity
            onPress={pickImage}
            style={{
              width: getSize(100),
              height: getSize(154),
              borderRadius: getSize(10),
              borderColor: '#909090',
              borderWidth: 2,
              borderStyle: 'dashed',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome name="plus" size={24} color="#909090" />
          </TouchableOpacity>
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
          onPress={() => {}}
        >
          <TextWeight900 style={{ color: '#6D6D6D' }}>현장컨펌</TextWeight900>
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
