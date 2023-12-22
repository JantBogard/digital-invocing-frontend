import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';
import { CustomerService } from './customer.service';
import { AddressService } from '../manage-address/address.service';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    CustomerComponent,
    CustomerModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule
  ],
  providers: [
    CustomerService,
    AddressService
  ]
})
export class ManageCustomerModule { }
