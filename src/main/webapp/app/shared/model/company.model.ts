import { IBranch } from 'app/shared/model/branch.model';
import { IBrand } from 'app/shared/model/brand.model';

export interface ICompany {
  id?: number;
  name?: string;
  cnpjNumber?: number;
  branches?: IBranch[];
  brand?: IBrand;
}

export const defaultValue: Readonly<ICompany> = {};
