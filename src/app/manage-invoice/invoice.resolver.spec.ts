import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { invoiceResolver } from './invoice.resolver';

describe('invoiceResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => invoiceResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
