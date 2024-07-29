# EXTRA

## 테스팅 방식

이 저장소에서 새로운 브랜치를 생성해서 테스팅해주세요!!

**1. expo go 다운로드**

- Play Store <br/>
  <img src="/assets/develop/play_store.png" width="200" height="200">

- App Store <br/>
  <img src="/assets/develop/app_store.png" width="200" height="200">

<br/>

**2. React 실행 시 아래 커멘드로 실행**

```bash
    $ npm run dev -- --host
```

```bash
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://아이피주소:5173
  ➜  press h + enter to show help
```

<br/>

**3. Webview 주소를 Network 주소로 수정**

```jsx
<WebView
  // 아래 링크를 수정하세요.
  source={{ uri: 'http://아이피주소:5173' }}
  style={{ flex: 1 }}
/>
```

> 참고: 라우팅된 주소를 테스팅하고 싶은 경우엔 해당 주소로 변경해야함<br/>
> 예: 스케줄표주소 -> http://localhost:5173/schedule

```jsx
<WebView
  // 아래 링크를 수정하세요.
  source={{ uri: 'http://아이피주소:5173/schedule' }}
  style={{ flex: 1 }}
/>
```

<br/>

**4. npm start**

**5. 모바일에서 qr 스캔**

---

## React Native, Webview 데이터 교환 형식

### 데이터 교환 방법

#### React에서 전송

```js
// React
const message = {
  type: '',
  data: {
    /*...*/
  },
};
window.ReactNativeWebView.postMessage(JSON.stringify(message));
```

```jsx
// React Native
const onMessage = (event: any) => {
  const { type, data } = JSON.parse(event.nativeEvent.data);
  /* ... */
}

return (
  <CustomWebView
    uri="http://아이피주소:5173"
    onMessage={onMessage}
    />
)
```

#### React Native에서 전송

```jsx
// React Native
const webViewRef = useRef();

useEffect(() => {
  const message = {
    type: '',
    data: {
      /*...*/
    },
  };
  webvViewRef.current.postMessage(JSON.stringify(message));
}, []);

return (
  <CustomWebView
    ref={webViewRef}
    uri="http://아이피주소:5173"
    onMessage={onMessage}
  />
);
```

```js
// React
const onMessage = (message: string) => {
  const { type, data } = JSON.parse(message);
  /* ... */
}

// ios
window.addEventListener('message',(e) => onMessage(e.data) );

// android
document.addEventListener('message',(e) => onMessage(e.data) );
```

### 보조출연자 홈화면

- /app/member/index

  - 리스트 보기 -> 공고 선택 -> 공고 화면
    - /app/member/home/detail

  ```js
  const message = { type: 'selectNotice', data: { notice_id: notice_id } };
  window.ReactNativeWebView.postMessage(JSON.stringify(message));
  ```

  - 캘린더 보기 -> 날짜 선택 -> 날짜 선택 시 화면
    - /app/member/home/date-detail

  ```js
  const message = { type: 'selectDate', data: { date: date } };
  window.ReactNativeWebView.postMessage(JSON.stringify(message));
  ```

  - 날짜 선택 시 화면 -> 공고 선택 -> 공고 화면

    - /app/member/home/detail

    ```js
    const message = { type: 'selectNotice', data: { notice_id: notice_id } };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    ```

  - 공고 화면 & 날짜 선택 시 화면 -> 뒤로가기 버튼 -> 홈화면
    ```js
    const message = { type: 'back', data: {} };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    ```

### 보조출연자 촬영관리

- /app/member/manage

  - 촬영 관리 -> 공고 클릭 -> 관리 화면
    - /app/member/manage/detail
    ```js
    const message = { type: 'manageNotice', data: { notice_id: notice_id } };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    ```

### 업체 공고

- /app/company/notice

  - 공고 -> 공고 클릭 -> 공고 화면
    - /app/company/notice/detail
    ```js
    const message = { type: 'selectNotice', data: { notice_id: notice_id } };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    ```
  - 공고 -> 공고 새로 만들기 -> 공고 등록
    - /app/company/notice/register
    ```js
    const message = { type: 'registerNotice', data: {} };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    ```
  - 공고 화면 & 공고 등록 -> 뒤로가기 버튼 -> 공고
    ```js
    const message = { type: 'back', data: {} };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    ```
