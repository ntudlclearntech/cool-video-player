import { QualitySelector } from '../quality-selector';

import { QualityProvider } from './quality-provider.interface';

import { QualityItem } from '../models/quality-item.model';

export abstract class AbstractQualityProvider implements QualityProvider {

  currentValue: QualityItem['value'] | undefined = undefined;

  constructor(
    protected plugin: QualitySelector,
  ) { }

  abstract init(): void;

  abstract changeQuality(value: QualityItem['value']): void;
}
