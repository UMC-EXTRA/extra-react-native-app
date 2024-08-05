import type { TabConfigType } from '@/components/TabsLayout';
import TabsLayout from '@/components/TabsLayout';

const tabConfig: TabConfigType = {
  index: {
    label: '홈',
    active: require('@/assets/images/icons/Home-color.png'),
    inactive: require('@/assets/images/icons/Home-gray.png'),
  },
  schedule: {
    label: '스케줄표',
    active: require('@/assets/images/icons/Today-color.png'),
    inactive: require('@/assets/images/icons/Today-gray.png'),
  },
  manage: {
    label: '촬영관리',
    active: require('@/assets/images/icons/Playlist-color.png'),
    inactive: require('@/assets/images/icons/Playlist-gray.png'),
  },
  profile: {
    label: '마이페이지',
    active: require('@/assets/images/icons/User-color.png'),
    inactive: require('@/assets/images/icons/User-gray.png'),
  },
};

const inVisiblePaths = [
  '/member/home/[date]',
  '/member/manage/detail',
  '/member/manage/chat',
  '/member/manage/clothes',
];

export default function AdminLayout() {
  return <TabsLayout tabConfig={tabConfig} inVisiblePaths={inVisiblePaths} />;
}
