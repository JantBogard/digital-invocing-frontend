import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ManageAddressModule } from './manage-address/manage-address.module';
import { ManageCustomerModule } from './manage-customer/manage-customer.module';
import { ManageInvoiceModule } from './manage-invoice/manage-invoice.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ManageAddressModule,
    ManageCustomerModule,
    ManageInvoiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
