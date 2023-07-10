import { QualityItem } from '../models/quality-item.model';

export interface QualityProvider {

  currentValue: QualityItem['value'] | undefined;

  init(): void;

  changeQuality(value: QualityItem['value']): void;
}
