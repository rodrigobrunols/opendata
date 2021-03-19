import { IAddress } from 'app/shared/model/address.model';
import { IAvailability } from 'app/shared/model/availability.model';
import { ICompany } from 'app/shared/model/company.model';

export interface IBranch {
  id?: number;
  name?: string;
  code?: number;
  type?: string;
  latitude?: number;
  longitude?: number;
  additionalInfo?: string;
  address?: IAddress;
  availabilities?: IAvailability[];
  company?: ICompany;
}

export const defaultValue: Readonly<IBranch> = {};
