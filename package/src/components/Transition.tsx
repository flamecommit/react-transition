'use client';

import {
  Fragment,
  ReactElement,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useDidMountEffect from '../hooks/useDidMountEffect';
import { IFunctionComponent, findRealElement } from '../utils/element';
import { getStyle } from '../utils/style';

interface IProps {
  show: boolean;
  name?: string;
  children: ReactElement;
}

function Transition({ show, name = 'default', children }: IProps) {
  const [classList, setClassList] = useState<string>('');
  const [realShow, setRealShow] = useState<boolean>(false);
  const action = useMemo(() => {
    return show ? 'enter' : 'leave';
  }, [show]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFrom, setIsFrom] = useState<boolean>(false);
  const [isTo, setIsTo] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [step, setStep] = useState<number>(0);
  const childRef = useRef<HTMLElement>(null);
  const [element, setElement] = useState<ReactElement>(children);

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

  useDidMountEffect(() => {
    stopTimeout();
    setIsActive(false);
    setIsFrom(false);
    setIsTo(false);
    setStep(1);
  }, [show]);

  useEffect(() => {
    if (show) {
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!step) return;
    switch (step) {
      case 1: {
        stopTimeout();
        setIsActive(true);
        setIsFrom(true);
        startTimeout(() => {
          setStep(2);
        }, 1);
        break;
      }
      case 2:
        setRealShow(true);
        startTimeout(() => {
          setStep(3);
        }, 80);
        break;
      case 3: {
        setIsFrom(false);
        setIsTo(true);

        const current = childRef.current;
        const duration = getStyle(current, 'transitionDuration');
        const delay = getStyle(current, 'transitionDelay');

        startTimeout(() => {
          setStep(4);
        }, duration + delay);
        break;
      }
      case 4: {
        setIsActive(false);
        setIsTo(false);
        if (!show) {
          setRealShow(false);
        }
        setStep(0);
        break;
      }
      default: {
        break;
      }
    }
  }, [action, show, step]);

  useEffect(() => {
    if (action === 'enter' && isFrom) {
      setRealShow(true);
    }
  }, [action, isFrom]);

  useEffect(() => {
    setClassList(
      `${isActive ? ` ${name}-${action}-active` : ``}${isFrom ? ` ${name}-${action}-from` : ``}${isTo ? ` ${name}-${action}-to` : ``}`
    );
  }, [action, isActive, isFrom, isTo, name]);

  useEffect(() => {
    // Children이 함수형 컴포넌트일 때
    if (typeof element.type === 'function')
      setElement((element.type as IFunctionComponent)({ ...element.props }));

    // Children이 Fragment일 때
    if (element.type === Fragment) {
      setElement(findRealElement(element));
    }
  }, [element]);

  return (
    <>
      {realShow &&
        cloneElement(element, {
          ...element.props,
          ref: childRef,
          className: `${element.props.className || ''}${classList}`,
        })}
    </>
  );
}

export default Transition;
