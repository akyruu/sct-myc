export interface Item<T> {
  readonly type: { name: string, value: T };
  quantity: number;
  value: number;
}
