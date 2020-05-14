import {Ore} from '../../reference/ore';
import {Item} from './item';

export interface OreItem extends Item<Ore> {
  readonly type: { name: 'harvest', value: Ore };
}

