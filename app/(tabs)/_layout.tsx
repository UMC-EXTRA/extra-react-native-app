import { ReactNode } from 'react';
import { Image } from 'react-native';
import { Tabs } from 'expo-router';
import normalize from 'react-native-normalize';
import colors from '@/constants/Colors';

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

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          height: normalize(100),
          paddingTop: 0,
        },
        tabBarLabelStyle: {
          fontWeight: 900,
          fontSize: normalize(12),
        },
        tabBarInactiveTintColor: colors.tabLabelLight,
        tabBarActiveTintColor: colors.highlight,
        tabBarItemStyle: {
          height: normalize(55),
          marginTop: normalize(20),
          alignSelf: 'flex-start',
        },
      }}
    >
      <Tabs.Screen
        name="recruit"
        options={{
          tabBarLabel: '지원현황',
          headerShown: false,
          tabBarIcon: ({ focused }): ReactNode => {
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
          tabBarIcon: ({ focused }): ReactNode => {
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
          tabBarIcon: ({ focused }): ReactNode => {
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
          tabBarIcon: ({ focused }): ReactNode => {
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
          tabBarIcon: ({ focused }): ReactNode => {
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
}

const styles = {
  image: {
    width: normalize(30),
    height: normalize(30),
  },
};
