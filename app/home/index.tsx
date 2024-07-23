import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
//import { initializeAdMob } from '@/scripts/initAds';
//import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { MainContainer } from '@/components/Container';
import getSize from '@/scripts/getSize';

const HomeScreen = () => {
  const [AdLoading, setAdLoading] = useState(true);

  useEffect(() => {
    // initializeAdMob().then(() => {
    //   console.log('성공');
    //   setAdLoading(false);
    // })
  }, []);

  return (
    <MainContainer>
      <View style={styles.header}>
        <View style={styles.menuContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="찾으시는 공고 있으세요?"
              placeholderTextColor="#DDD"
            />
            <TouchableOpacity>
              <AntDesign name="search1" size={getSize(21)} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Image
                style={styles.image}
                source={require('@/assets/images/icons/QR.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.image}
                source={require('@/assets/images/icons/Ball.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bannerAds}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>
            광고
          </Text>
          {/* {!AdLoading && <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.INLINE_ADAPTIVE_BANNER} />} */}
        </View>
      </View>
      <WebView
        source={{ uri: 'https://extra-react-webview.vercel.app/' }}
        style={styles.webView}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: getSize(261),
  },
  menuContainer: {
    marginTop: getSize(112),
    width: '100%',
    height: getSize(37),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: getSize(262),
    height: '100%',
    borderRadius: getSize(30),
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#ADADAD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getSize(16),
    marginLeft: getSize(12),
  },
  input: {
    color: '#fff',
    fontSize: getSize(11),
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight: getSize(34),
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: getSize(80),
  },
  image: {
    width: getSize(34),
    height: getSize(34),
  },
  bannerAds: {
    width: getSize(412),
    height: getSize(86),
    marginTop: getSize(26),
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#9a9a9a',
  },
  webView: {
    flex: 1,
  },
});

export default HomeScreen;
