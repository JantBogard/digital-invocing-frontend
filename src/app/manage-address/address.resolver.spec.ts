import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { addressResolver } from './address.resolver';

describe('addressResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => addressResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
