import { Invoice } from "./Invoice.model";

export interface InvoiceItem {
  id: number;
  name: string;
  quantite: number;
  price: number;
  total: number;
  owningInvoice: Invoice;
}
