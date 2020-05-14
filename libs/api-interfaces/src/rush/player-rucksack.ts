import {Rucksack} from '../reference/rucksack';
import {Item} from './common/item';

export interface PlayerRucksack {
  type: Rucksack;
  items: Item<any>[];

  // Calculated
  storage: number; // Percentage
  quantity: number; // Number of items
  value: string; // Estimated value of content
}
