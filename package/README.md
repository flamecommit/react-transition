## 라이브러리 개요

react-dialog 는 React 기반의 웹 애플리케이션에서 Custom Dialogbox를 쉽게 사용할 수 있도록 도와주는 라이브러리 입니다.

## 기능 소개

- DialogProvider 컴포넌트를 사용하여 최상위 컴포넌트를 감싸줍니다.
- useDialog를 사용하여 alert, confirm, prompt 메소드를 가져옵니다.
- javascript의 async, await 기능을 사용하여 Dialogbox를 동기적으로 사용합니다.
  ​

## 설치

npm을 사용하여 설치할 수 있습니다.

```bash
npm install @shinyongjun/react-dialog
```

또는 yarn을 사용할 수도 있습니다.

```bash
yarn add @shinyongjun/react-dialog
```

## 예제 코드

라이브러리의 간단한 사용 예제 코드입니다.

```tsx
import { DialogProvider } from '@shinyongjun/react-dialog';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import '@shinyongjun/react-dialog/css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </React.StrictMode>
);
```

```tsx
import * as React from 'react';
import { useDialog } from '@shinyongjun/react-dialog';

function App() {
  const { alert } = useDialog();

  const onAlertClick = async () => {
    await alert('are you sure?');
    console.log('closed alert');
  };

  return (
    <div>
      <button type="button" onClick={alert}>
        Open to Alert Dialog
      </button>
    </div>
  );
}

export default App;
```

## API 문서

라이브러리의 주요 API들에 대한 문서를 [여기](https://shinyongjun.gitbook.io/react-dialog/)에서 확인할 수 있습니다.

## 실제 사용 사례

라이브러리의 데모는 [여기](https://shinyongjun.com/library/react-dialog)에서 만나볼 수 있습니다.

## 피드백 및 지원

라이브러리에 대한 피드백이나 문제 신고는 [GitHub Issues 페이지](https://github.com/shinyj1991/react-dialog/issues)에서 제공합니다.
