import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LoaderService } from '../core/components/loader/loader.service';
import { InvoiceService } from './invoice.service';
import { Invoice } from '../shared/models/Invoice.model';

export const invoiceResolver: ResolveFn<Array<Invoice>> = (route, state, loaderService = inject(LoaderService), invoiceService = inject(InvoiceService)) => {
  loaderService.show();
  return invoiceService.getAll();
};
