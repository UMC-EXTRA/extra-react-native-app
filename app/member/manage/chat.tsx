import { useState, useEffect } from 'react';
import type { Chat } from '@/components/Chat';
import ChatContainer from '@/components/Chat';

const chatingList: Chat[] = [
  {
    id: 1,
    user_id: 1,
    name: '김민수',
    profile: require('@/assets/images/sample.jpeg'),
    content: '안녕하세요',
    time: '2021.08.20 12:30',
    readingCount: 32,
  },
  {
    id: 2,
    user_id: 2,
    name: '이건',
    profile: require('@/assets/images/sample.jpeg'),
    content: '네 안녕하세요!',
    time: '2021.08.20 12:31',
    readingCount: 32,
  },
  {
    id: 3,
    user_id: 1,
    name: '김민수',
    profile: require('@/assets/images/sample.jpeg'),
    content: `촬영 시 주의사항

가나다라마바사아자차카타파하
가나다라마바사아자차카타파하가나다라
촬영 시 주의사항

가나다라마바사아자차카타파하
가나다라마바사아자차카타파하가나다라
촬영 시 주의사항

가나다라마바사아자차카타파하
가나다라마바사아자차카타파하가나다라
촬영 시 주의사항
가나다라마바사아자차카타파하
가나다라마바사아자차카타파하가나다라`,
    time: '2021.08.20 12:35',
    readingCount: 32,
  },
  {
    id: 4,
    user_id: 3,
    name: '이철수',
    profile: require('@/assets/images/sample.jpeg'),
    content:
      '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    time: '2021.08.20 12:40',
    readingCount: 32,
  },
  {
    id: 5,
    user_id: 2,
    name: '이건',
    profile: require('@/assets/images/sample.jpeg'),
    content:
      '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    time: '2021.08.20 12:45',
    readingCount: 32,
  },
];

const notice = {
  title: '촬영 시 주의사항',
  content:
    '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
};

const ChatScreen = () => {
  const [data, setData] = useState<Chat[]>([]);

  useEffect(() => {
    setData(chatingList);
  }, []);

  return (
    <ChatContainer
      title="UMC 드라마 촬영"
      headcount={60}
      backLink="/member/manage/detail"
      createDate="2021.08.20"
      chatingList={data}
      user_id={2}
      notice={notice}
    />
  );
};

export default ChatScreen;
