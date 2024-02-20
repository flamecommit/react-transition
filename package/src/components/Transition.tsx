'use client';

import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface IProps {
  show: boolean;
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

function Transition({ show, children }: IProps) {
  const DURATION = 1000;
  const [classList, setClassList] = useState<string>('');
  const [realShow, setRealShow] = useState<boolean>(false);
  const action = useMemo(() => {
    return show ? 'enter' : 'leave';
  }, [show]);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFrom, setIsFrom] = useState<boolean>(false);
  const [isTo, setIsTo] = useState<boolean>(false);

  useEffect(() => {
    setIsActive(true);
    if (show) {
      setIsFrom(true);
      setTimeout(() => {
        setIsFrom(false);
        setIsTo(true);
      }, 1);
      setTimeout(() => {
        setIsTo(false);
        setIsActive(false);
      }, DURATION);
    } else {
      setIsFrom(true);
      setTimeout(() => {
        setIsFrom(false);
        setIsTo(true);
      }, 1);
      setTimeout(() => {
        setIsTo(false);
        setIsActive(false);
        setRealShow(false);
      }, DURATION);
    }
  }, [action, show]);

  useEffect(() => {
    if (action === 'enter' && isFrom) {
      setRealShow(true);
    }
  }, [action, isFrom]);

  useEffect(() => {
    console.log(isActive, isFrom, isTo);
    setClassList(
      `${isActive ? ` ${action}-active` : ``}${isFrom ? ` ${action}-from` : ``}${isTo ? ` ${action}-to` : ``}`
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
