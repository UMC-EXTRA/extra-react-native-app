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

- 홈화면: /app/home/index
- 지원현황: /app/home/recruit
- 스케줄표: /app/home/schedule

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
