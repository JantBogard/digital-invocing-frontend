import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './manage-address/components/address/address.component';
import { addressResolver } from './manage-address/address.resolver';
import { CustomerComponent } from './manage-customer/components/customer/customer.component';
import { customerResolver } from './manage-customer/customer.resolver';
import { InvoiceComponent } from './manage-invoice/components/invoice/invoice.component';
import { invoiceResolver } from './manage-invoice/invoice.resolver';
import { InvoicePreviewComponent } from './manage-invoice/components/invoice-preview/invoice-preview.component';

const routes: Routes = [
  { path: 'address', component: AddressComponent, resolve: { addressList: addressResolver } },
  { path: 'customer', component: CustomerComponent, resolve: { customers: customerResolver } },
  { path: 'invoice', component: InvoiceComponent, resolve: { invoices: invoiceResolver } },
  { path: 'invoice-preview', component: InvoicePreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
