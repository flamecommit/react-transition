export const convertToMilliseconds = (timeString: string): number => {
  const numericValue = parseFloat(timeString);
  const unit = timeString.slice(-1);

  switch (unit) {
    case 's':
      return numericValue * 1000;
    default:
      throw new Error('Unsupported unit. Only "s" (seconds) is supported.');
  }
};
