import {Ore} from '../../settings/ore';

export interface FragmentOre {
  type: Ore;
  percent: number; // Percent

  // Calculated
  quantity: number; // Number of items
  value: string; // Estimated value of content
}
