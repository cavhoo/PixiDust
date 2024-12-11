export type Constructable<T, TArgs extends any[] = any> = {
  new (...args: TArgs): T;
};
