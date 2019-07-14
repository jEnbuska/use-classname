export function memoize<T extends any[], R>(callback: (...input: T) => R) {
  let prevInput: any = [Symbol('NOT_SET')];
  let prevOutput: R;
  return function memoized(...input: T): R {
    if (
      input.length !== prevInput.length ||
      input.some((it: any, index: number) => it !== prevInput[index])
    ) {
      prevInput = input;
      return (prevOutput = callback(...input));
    }
    return prevOutput;
  };
}

export function skip<T extends any[], R>(
  n: number,
  callback: (...input: T) => R
) {
  let skipped = 0;
  return function skipper(...input: T): R | undefined {
    if (skipped < n) {
      console.log('skip');
      skipped++;
      return;
    }
    return callback(...input);
  };
}

export function getItemOrDefault<T>(key: string, defaultData: T) {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item);
  return defaultData;
}

export function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce((acc, k) => ({...acc, [k]: obj[k]}), {}) as Pick<T, K>;
}