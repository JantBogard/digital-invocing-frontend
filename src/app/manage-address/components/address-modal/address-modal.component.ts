import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../shared/models/Address.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.scss'
})
export class AddressModalComponent implements OnInit {

  public addressForm!: FormGroup;
  public isAdd!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) private address: Address
  ) { }

  ngOnInit(): void {
    if (this.address) {
      this.addressForm = this.formBuilder.group({
        'street': [this.address.street, Validators.required],
        'city': [this.address.city, Validators.required],
        'state': [this.address.state, Validators.required],
        'zipCode': [this.address.zipCode, Validators.required],
        'country': [this.address.country, Validators.required]
      })
    } else {
      this.isAdd = true;
      this.addressForm = this.formBuilder.group({
        'street': ['', Validators.required],
        'city': ['', Validators.required],
        'state': ['', Validators.required],
        'zipCode': ['', Validators.required],
        'country': ['', Validators.required]
      })
    }
  }

  submitData(): void {

    this.dialogRef.close(this.addressForm.value);
  }
}
