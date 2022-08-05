export { createRouterHelpers } from './router';

export function reduceArrayToObject<T>(array: T[], key: keyof T): Record<string, T> {
  return array.reduce((p, c) => ({
    ...p,
    [c[key] as unknown as string]: c,
  }), {} as Record<string, T>);
}

export const isPresent = (value: any): boolean => value && value !== undefined && value !== null && String(value).trim().length > 0;
