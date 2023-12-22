import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CustomerService } from './customer.service';
import { LoaderService } from '../core/components/loader/loader.service';
import { Customer } from '../shared/models/Customer.model';

export const customerResolver: ResolveFn<Array<Customer>> = (route, state, loaderService = inject(LoaderService), customerService = inject(CustomerService)) => {
  loaderService.show();
  return customerService.getAll();
};
