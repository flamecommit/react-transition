import { DependencyList, useEffect, useRef } from 'react';

const useDidMountEffect = (func: () => void, deps: DependencyList) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else {
      setTimeout(() => {
        didMount.current = true;
      }, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDidMountEffect;
