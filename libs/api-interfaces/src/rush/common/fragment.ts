import {FragmentOre} from './fragment-ore';

export interface Fragment {
  ores: FragmentOre[];

  // Calculate
  quantity: number;
  value: number;
}
