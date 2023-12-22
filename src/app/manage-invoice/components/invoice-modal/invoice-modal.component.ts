import { AddressService } from './../../../manage-address/address.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../shared/models/Address.model';
import { Customer } from '../../../shared/models/Customer.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from '../../../shared/models/Invoice.model';
import { CustomerService } from '../../../manage-customer/customer.service';

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrl: './invoice-modal.component.scss'
})
export class InvoiceModalComponent implements OnInit {
  public invoiceForm!: FormGroup;
  public items!: FormArray;
  public isAdd!: boolean;
  public addressList!: Array<Address>;
  public customers!: Array<Customer>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<InvoiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) private invoice: Invoice,
    private addressService: AddressService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.addressList = this.addressService.addressList;
    this.customers = this.customerService.customers;

    if (this.invoice) {
      this.items = this.formBuilder.array([]);

      this.invoice.items.forEach(
        item => {
          this.items.push(
            this.formBuilder.group({
              'name': item.name,
              'quantite': item.quantite,
              'price': item.price,
              'total': item.total
            })
          )
        }
      )

      this.invoiceForm = this.formBuilder.group({
        'customer': [this.invoice.customer, Validators.required],
        'items': this.items,
        'billingAddress': [this.invoice.billingAddress, Validators.required],
      })
    } else {
      this.isAdd = true;
      this.items = this.formBuilder.array([
        this.formBuilder.group({
          'name': '',
          'quantite': 0,
          'price': 0,
          'total': 0
        })
      ]);

      this.invoiceForm = this.formBuilder.group({
        'customer': ['', Validators.required],
        'items': this.items,
        'billingAddress': ['', Validators.required]
      });

    }
  }

  onAddItem(): void {
    this.items.push(
      this.formBuilder.group({
        'name': '',
        'quantite': 0,
        'price': 0,
        'total': 0
      })
    );
  }

  onRemoveItem(index: number): void {
    this.items.removeAt(index);
  }

  submitData(): void {
    const invoice: Invoice = this.invoiceForm.value;
    invoice.totalAmount = 0;

    invoice.items.forEach(
      item => {
        item.total = item.price * item.quantite;
        invoice.totalAmount += item.total;
      }
    )

    this.addressService.addressList.forEach(
      address => {
        if (address.id === +this.invoiceForm.get('billingAddress')?.value) {
          invoice.billingAddress = address;
        }
      }
    )

    this.customerService.customers.forEach(
      customer => {
        if (customer.id === +this.invoiceForm.get('customer')?.value) {
          invoice.customer = customer;
        }
      }
    );

    console.log(invoice);
    this.dialogRef.close(invoice);
  }

}
