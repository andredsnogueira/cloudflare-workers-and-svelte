import type { ContactField, UnitID } from './enums';

export type SimplifiedProductDTO = {
  id: string;
  name: string;
  startingPrice: number;
  currency: string;
};

export type Product = {
  id: string;
  name: string;
  options: Option[];
  defaultCurrency: string;
  availableCurrencies: string[];
};

export type Option = {
  id: string;
  isDefault: boolean;
  name: string;
  requiredContactFields: ContactField[];
  units: Unit[];
};

export type Unit = {
  id: UnitID;
  name: string;
  pricing: Pricing[];
};

export type Pricing = {
  currency: string;
  currencyPrecision: number;
  price: number;
};

export type Contact = {
  fullName: string | null;
  emailAddress: string | null;
  phoneNumber: string | null;
};

export type UnitItem = {
  unitId: UnitID;
  quantity: number;
  price: number;
};

export type Booking = {
  id: string;
  productId: string;
  optionId: string;
  pricing: Pricing;
  unitItems: UnitItem[];
  contact: Contact;
};
