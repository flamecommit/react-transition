import { convertToMilliseconds } from './converter';

export const getStyle = (
  current: HTMLElement | null,
  type: 'transitionDuration' | 'transitionDelay'
): number => {
  if (current === null || !window) return 0;

  const value = window.getComputedStyle(current)[type] || '0s';

  return convertToMilliseconds(value);
};
