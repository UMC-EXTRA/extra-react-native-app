import type { TabConfigType } from '@/components/TabsLayout';
import TabsLayout from '@/components/TabsLayout';

const tabConfig: TabConfigType = {
  recruit: {
    label: '공고',
    active: require('@/assets/images/icons/Document-color.png'),
    inactive: require('@/assets/images/icons/Document-gray.png'),
  },
  manage: {
    label: '현장관리',
    active: require('@/assets/images/icons/Support-color.png'),
    inactive: require('@/assets/images/icons/Support-gray.png'),
  },
  index: {
    label: '홈',
    active: require('@/assets/images/icons/Home-color.png'),
    inactive: require('@/assets/images/icons/Home-gray.png'),
  },
  profile: {
    label: '마이페이지',
    active: require('@/assets/images/icons/User-color.png'),
    inactive: require('@/assets/images/icons/User-gray.png'),
  },
};

export default function AdminLayout() {
  return <TabsLayout tabConfig={tabConfig} />;
}
