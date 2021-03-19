import { ICompany } from 'app/shared/model/company.model';

export interface IBrand {
  id?: number;
  title?: string;
  companies?: ICompany[];
}

export const defaultValue: Readonly<IBrand> = {};
