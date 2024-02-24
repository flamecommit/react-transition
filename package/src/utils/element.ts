import { Fragment, ReactElement } from 'react';

export interface IFunctionComponent {
  (props: any): JSX.Element;
}

export const findRealElement = (target: ReactElement): ReactElement => {
  const element = target.props.children;

  if (typeof element.type === 'function')
    return (element.type as IFunctionComponent)({ ...element.props });
  // 중첩 Fragment일 때 재귀실행
  if (element.type === Fragment) return findRealElement(element);

  return element;
};
