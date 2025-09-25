// src/utilities/devMock.ts

export const mockIfDev = <T>(realFn: () => Promise<T>, mockData: T, delay = 300) => {
  if (import.meta.env.DEV) {
    return async () => {
      console.log('[Mocked Query] Returning mock data');
      return new Promise<T>((resolve) => {
        setTimeout(() => resolve(mockData), delay);
      });
    };
  }

  return realFn;
};
