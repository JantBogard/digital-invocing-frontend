import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './manage-address/components/address/address.component';
import { addressResolver } from './manage-address/address.resolver';

const routes: Routes = [
  { path: 'address', component: AddressComponent, resolve: { addressList: addressResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
