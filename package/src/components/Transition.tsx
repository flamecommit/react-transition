'use client';

import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface IProps {
  show: boolean;
  name?: string;
  duration: number;
  children: ReactNode;
}

// enter-active
// enter-from 0 => enter-to 1

// leave-active
// leave-from 1 => leave-to 0

/*
v-enter-from: 진입 시작 상태. 엘리먼트가 삽입되기 전에 추가되고, 엘리먼트가 삽입되고 1 프레임 후 제거됩니다.

v-enter-active: 진입 활성 상태. 모든 진입 상태에 적용됩니다. 엘리먼트가 삽입되기 전에 추가되고, 트랜지션/애니메이션이 완료되면 제거됩니다. 이 클래스는 진입 트랜지션에 대한 지속 시간, 딜레이 및 이징(easing) 곡선을 정의하는 데 사용할 수 있습니다.

v-enter-to: 진입 종료 상태. 엘리먼트가 삽입된 후 1 프레임 후 추가되고(동시에 v-enter-from이 제거됨), 트랜지션/애니메이션이 완료되면 제거됩니다.

v-leave-from: 진출 시작 상태. 진출 트랜지션이 트리거되면 즉시 추가되고 1 프레임 후 제거됩니다.

v-leave-active: 진출 활성 상태. 모든 진출 상태에 적용됩니다. 진출 트랜지션이 트리거되면 즉시 추가되고, 트랜지션/애니메이션이 완료되면 제거됩니다. 이 클래스는 진출 트랜지션에 대한 지속 시간, 딜레이 및 이징 곡선을 정의하는 데 사용할 수 있습니다.

v-leave-to: 진출 종료 상태. 진출 트랜지션이 트리거된 후 1 프레임이 추가되고(동시에 v-leave-from이 제거됨), 트랜지션/애니메이션이 완료되면 제거됩니다.
*/

/*
  0 미동작

  - enter -
  1. active - true, from - true, render - true : ms 1
  2. from - false, to - true
  3. to - false, active - false

  - leave -
  1. active - true, from - true
  2. from - false, to - true
  3. to - false, active - false, render - false
*/

function Transition({ show, name = 'default', duration, children }: IProps) {
  const [classList, setClassList] = useState<string>('');
  const [realShow, setRealShow] = useState<boolean>(false);
  const action = useMemo(() => {
    return show ? 'enter' : 'leave';
  }, [show]);

  const [step, setStep] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFrom, setIsFrom] = useState<boolean>(false);
  const [isTo, setIsTo] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const firstShow = useRef<boolean>(false);

  const startTimeout = (callback: () => void, ms: number) => {
    timeoutRef.current = setTimeout(() => {
      callback();
    }, ms);
  };

  const stopTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const step1 = useCallback(() => {
    stopTimeout();
    if (action === 'enter') {
      setIsActive(true);
      setIsFrom(true);
      setRealShow(true);
    }
    if (action === 'leave') {
      setIsActive(true);
      setIsFrom(true);
    }
    startTimeout(step2, 30);
  }, [action]);

  const step2 = useCallback(() => {
    if (action === 'enter') {
      setIsFrom(false);
      setIsTo(true);
    }
    if (action === 'leave') {
      setIsFrom(false);
      setIsTo(true);
    }
    startTimeout(step3, duration);
  }, [action]);

  const step3 = useCallback(() => {
    if (action === 'enter') {
      setIsActive(false);
      setIsTo(false);
    }
    if (action === 'leave') {
      setIsActive(false);
      setIsTo(false);
      setRealShow(false);
    }
  }, [action]);

  useEffect(() => {
    if (show) firstShow.current = true;
    if (!firstShow.current) return;

    step1();
  }, [show]);

  useEffect(() => {
    if (action === 'enter' && isFrom) {
      setRealShow(true);
    }
  }, [action, isFrom]);

  useEffect(() => {
    setClassList(
      `${isActive ? ` ${name}-${action}-active` : ``}${isFrom ? ` ${name}-${action}-from` : ``}${isTo ? ` ${name}-${action}-to` : ``}`
    );
  }, [action, isActive, isFrom, isTo]);

  return (
    <>
      {realShow &&
        Children.map(children, (child) => {
          const element = child as ReactElement;
          return cloneElement(element, {
            className: `${element.props.className}${classList}`,
          });
        })}
    </>
  );
}

export default Transition;
