'use client';

import {
  ReactElement,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useDidMountEffect from '../hooks/useDidMountEffect';

interface IChildFunctionComponent {
  (props: any): JSX.Element;
}

interface IProps {
  show: boolean;
  name?: string;
  children: ReactElement;
}

function convertToMilliseconds(timeString: string): number {
  const numericValue = parseFloat(timeString);
  const unit = timeString.slice(-1);

  switch (unit) {
    case 's':
      return numericValue * 1000;
    default:
      throw new Error('Unsupported unit. Only "s" (seconds) is supported.');
  }
}

function Transition({ show, name = 'default', children }: IProps) {
  const DEFAULT_DURATION = 0;
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

  // console.log(typeof children);

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

        const transitionDuration = current
          ? window?.getComputedStyle(current)?.transitionDuration || '0s'
          : '0s';
        const duration = convertToMilliseconds(transitionDuration);
        const transitionDelay = current
          ? window?.getComputedStyle(current)?.transitionDelay || '0s'
          : '0s';
        const delay = convertToMilliseconds(transitionDelay);

        startTimeout(
          () => {
            setStep(4);
          },
          (duration || DEFAULT_DURATION) + delay
        );
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

  const element =
    typeof children.type === 'function'
      ? (children.type as IChildFunctionComponent)({ ...children.props })
      : children;

  return (
    realShow &&
    cloneElement(element, {
      ...element.props,
      ref: childRef,
      className: `${element.props.className || ''}${classList}`,
    })
  );
}

export default Transition;
