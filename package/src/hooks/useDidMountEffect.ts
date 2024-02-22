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
  }, deps);
};

export default useDidMountEffect;
