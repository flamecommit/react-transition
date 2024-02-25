## 라이브러리 개요

react-transition 은 React 기반의 웹 애플리케이션에서 Node의 등장과 퇴장 애니메이션을 쉽게 구현할 수 있도록 도와주는 라이브러리 입니다.

## 기능 소개

- <Transition> 컴포넌트를 사용하여 쉽게 애니메이션을 구현합니다.
- 등장과 퇴장 원하는 구간에 애니메이션을 적용합니다.
- name 속성을 사용하여 애니메이션을 커스텀 할 수 있습니다.
  ​

## 설치

npm을 사용하여 설치할 수 있습니다.

```bash
npm install @shinyongjun/react-transition
```

또는 yarn을 사용할 수도 있습니다.

```bash
yarn add @shinyongjun/react-transition
```

## 예제 코드

라이브러리의 간단한 사용 예제 코드입니다.

```tsx
import { Transition } from '@shinyongjun/react-transition';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setShow(!show)}>
        Animation Toggler
      </button>
      <Transition show={show}>
        <div>Animation</div>
      </Transition>
    </div>
  );
}

export default App;
```

```css
.default-enter-active,
.default-leave-active {
  transition: all 1s ease-in;
}

.default-enter-from,
.default-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```

## API 문서

라이브러리의 주요 API들에 대한 문서를 [Docs](https://shinyongjun.gitbook.io/react-transition/)에서 확인할 수 있습니다.

## 실제 사용 사례

라이브러리의 실제 사용 예시는 [Demo](https://shinyongjun.com/library/react-transition)에서 확인할 수 있습니다.

## 피드백 및 지원

라이브러리에 대한 피드백이나 문제 신고는 [GitHub Issues 페이지](https://github.com/flamecommit/react-transition/issues)에서 제공합니다.
