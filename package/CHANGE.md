## 1.4.0

- children으로 ReactElement[] 을 받을 수 있습니다.
- as 옵션이 추가되었습니다. (Transition의 Tag 지정 가능)

## 1.3.0

- className props 추가
- child className 이 잘못 들어가던 현상 수정

## 1.2.5

children 내부 hooks 이 실행 안되던 버그 fix

## 1.2.3

Transition 반환 타입 fix

## 1.2.0

children이 Fragment일 때와 중첩 Fragment일 때 상황을 대응합니다.

## 1.1.6

JSX.element Props 전달

## 1.1.5

JSX.element 예외 처리

## 1.1.3 ~ 1.1.4

Delay 계산 버그 수정

## 1.1.2

이제 렌더링시에 show의 초기값이 true라면 바로 enter가 실행됩니다.

## 1.1.0

duration 옵션이 삭제됩니다.
CSS의 transitionDuration 속성을 참조하여 자동으로 setTImeout의 속도를 지정합니다.

## 1.0.3

fix useCallback DependencyList
step1 => step2 delay 30 => 50
