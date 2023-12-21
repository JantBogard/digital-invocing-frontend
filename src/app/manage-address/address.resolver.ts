import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AddressService } from './address.service';
import { LoaderService } from '../core/components/loader/loader.service';
import { Address } from '../shared/models/Address.model';

export const addressResolver: ResolveFn<Array<Address>> = (route, state, addressService = inject(AddressService), loaderService = inject(LoaderService)) => {
  loaderService.show();
  return addressService.getAll();
};
