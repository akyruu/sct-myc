import {Item} from './item';

export interface Box {
  maxQuantity: number;
  items: Item<any>[];

  // Calculated
  storage: number; // Percentage
  quantity: number; // Number of items
  value: string; // Estimated value of content
}
