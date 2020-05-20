import {Harvest} from '../../settings/harvest';
import {Item} from './item';

export interface HarvestItem extends Item<Harvest> {
  readonly type: { name: 'harvest', value: Harvest };
}
