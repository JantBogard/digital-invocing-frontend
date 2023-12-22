import { Address } from "./Address.model";
import { Customer } from "./Customer.model";
import { InvoiceItem } from "./Invoice-item.model";

export interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: Customer;
  items: Array<InvoiceItem>;
  billingAddress: Address;
  totalAmount: number;
}
