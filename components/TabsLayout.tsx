import { ImageSourcePropType, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Tabs, usePathname } from 'expo-router';
import colors from '@/constants/Colors';
import getSize from '@/scripts/getSize';

type TabConfigType = {
  [key: string]: {
    label: string;
    active: ImageSourcePropType;
    inactive: ImageSourcePropType;
  };
};

interface TabsLayoutProps {
  tabConfig: TabConfigType;
  inVisiblePaths?: string[];
}

const TabsLayout = ({ tabConfig, inVisiblePaths = [] }: TabsLayoutProps) => {
  const pathname = usePathname();
  const currentTab = pathname.split('/')[2];

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarVisible: Object.keys(tabConfig).includes(route.name),
        tabBarButton: Object.keys(tabConfig).includes(route.name)
          ? undefined
          : () => null,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          height: Platform.OS === 'ios' ? getSize(160) : getSize(126),
          display: inVisiblePaths.includes(pathname) ? 'none' : 'flex',
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Black',
          fontWeight: '900',
          fontSize: getSize(14),
          marginTop: getSize(10),
        },
        tabBarInactiveTintColor: '#999',
        tabBarActiveTintColor: '#F5C001',
        tabBarItemStyle: {
          height: getSize(60),
          marginTop: getSize(29),
        },
      })}
    >
      {Object.entries(tabConfig).map(([name, config]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarLabel: config.label,
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused || name === currentTab
                    ? config.active
                    : config.inactive
                }
                style={{
                  width: getSize(39),
                  height: getSize(39),
                }}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export type { TabConfigType };
export default TabsLayout;
