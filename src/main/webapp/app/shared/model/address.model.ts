export interface IAddress {
  id?: number;
  address?: string;
  districtName?: string;
  townName?: string;
  countrySubDivision?: string;
  postCode?: number;
  additionalInfo?: string;
}

export const defaultValue: Readonly<IAddress> = {};
