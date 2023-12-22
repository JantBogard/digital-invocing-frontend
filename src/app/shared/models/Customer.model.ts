import { Address } from "./Address.model";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: Address;
}
