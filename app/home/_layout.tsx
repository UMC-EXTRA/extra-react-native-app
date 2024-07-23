import { Image } from 'react-native';
import { Tabs } from 'expo-router';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

const HomeColorIcon = require('@/assets/images/icons/Home-color.png');
const HomeGrayIcon = require('@/assets/images/icons/Home-gray.png');
const PlaylistColorIcon = require('@/assets/images/icons/Playlist-color.png');
const PlaylistGrayIcon = require('@/assets/images/icons/Playlist-gray.png');
const TodayColorIcon = require('@/assets/images/icons/Today-color.png');
const TodayGrayIcon = require('@/assets/images/icons/Today-gray.png');
const SpeechColorIcon = require('@/assets/images/icons/Speech-color.png');
const SpeechGrayIcon = require('@/assets/images/icons/Speech-gray.png');
const UserColorIcon = require('@/assets/images/icons/User-color.png');
const UserGrayIcon = require('@/assets/images/icons/User-gray.png');

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          height: getSize(160),
          paddingTop: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Bold',
          fontWeight: '900',
          fontSize: getSize(14),
        },
        tabBarInactiveTintColor: '#999',
        tabBarActiveTintColor: '#F5C001',
        tabBarItemStyle: {
          height: getSize(55),
          marginTop: getSize(27),
          alignSelf: 'flex-start',
        },
      }}
    >
      <Tabs.Screen
        name="recruit"
        options={{
          tabBarLabel: '지원현황',
          headerStyle: {
            backgroundColor: '#232226',
            height: getSize(80),
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? PlaylistColorIcon : PlaylistGrayIcon}
                style={styles.image}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          tabBarLabel: '스케줄표',
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? TodayColorIcon : TodayGrayIcon}
                style={styles.image}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: '홈',
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? HomeColorIcon : HomeGrayIcon}
                style={styles.image}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: '채팅',
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? SpeechColorIcon : SpeechGrayIcon}
                style={styles.image}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: '마이페이지',
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? UserColorIcon : UserGrayIcon}
                style={styles.image}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

const styles = {
  image: {
    width: getSize(39),
    height: getSize(39),
  },
};

export default TabsLayout;
