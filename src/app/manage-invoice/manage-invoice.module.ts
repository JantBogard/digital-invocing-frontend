import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceModalComponent } from './components/invoice-modal/invoice-modal.component';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';
import { InvoiceService } from './invoice.service';
import { AddressService } from '../manage-address/address.service';
import { CustomerService } from '../manage-customer/customer.service';
import { NgxPrintModule } from 'ngx-print';



@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceModalComponent,
    InvoicePreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxPrintModule
  ],
  providers: [
    InvoiceService,
    AddressService,
    CustomerService
  ]
})
export class ManageInvoiceModule { }
