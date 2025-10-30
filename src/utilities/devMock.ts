// src/utilities/devMock.ts

export const mockIfDev = <T>(
  realFn: (...args: any[]) => Promise<T>,
  mockData: T | ((...args: any[]) => T),
  delay = 300,
) => {
  if (import.meta.env.DEV) {
    return async (...args: any[]): Promise<T> => {
      const result = typeof mockData === 'function' ? (mockData as (...args: any[]) => T)(...args) : mockData;

      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(result), delay);
      });
    };
  }

  return realFn;
};
