import {Rucksack} from '../settings/rucksack';
import {Item} from './common/item';

export interface PlayerRucksack {
  type: Rucksack;
  items: Item<any>[];

  // Calculated
  storage: number; // Percentage
  quantity: number; // Number of items
  value: number; // Estimated value of content
}
