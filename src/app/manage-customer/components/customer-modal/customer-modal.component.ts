import { AddressService } from './../../../manage-address/address.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../../shared/models/Customer.model';
import { Address } from '../../../shared/models/Address.model';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrl: './customer-modal.component.scss'
})
export class CustomerModalComponent implements OnInit {

  public customerForm!: FormGroup;
  public isAdd!: boolean;
  public addressList!: Array<Address>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CustomerModalComponent>,
    @Inject(MAT_DIALOG_DATA) private customer: Customer,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.addressList = this.addressService.addressList;
    if (this.customer) {
      this.customerForm = this.formBuilder.group({
        'name': [this.customer.name, Validators.required],
        'email': [this.customer.email, [Validators.required, Validators.email]],
        'phone': [this.customer.phone, Validators.required],
        'address': [this.customer.address.id, Validators.required]
      })
    } else {
      this.isAdd = true;
      this.customerForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'email': ['', [Validators.required, Validators.email]],
        'phone': ['', Validators.required],
        'address': ['', Validators.required]
      })
    }
  }

  submitData(): void {
    const customer: Customer = this.customerForm.value;

    this.addressService.addressList.forEach(
      address => {
        if (address.id === +this.customerForm.get('address')?.value) {
          customer.address = address;
        }
      }
    )
    this.dialogRef.close(customer);
  }
}
