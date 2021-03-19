import { Moment } from 'moment';
import { IBranch } from 'app/shared/model/branch.model';

export interface IAvailability {
  id?: number;
  weekday?: string;
  openingTime?: Moment;
  closingTime?: Moment;
  branch?: IBranch;
}

export const defaultValue: Readonly<IAvailability> = {};
