import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './components/address/address.component';
import { AddressModalComponent } from './components/address-modal/address-modal.component';
import { SharedModule } from '../shared/shared.module';
import { AddressService } from './address.service';



@NgModule({
  declarations: [
    AddressComponent,
    AddressModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    AddressService
  ]
})
export class ManageAddressModule { }
