import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../invoice.service';
import { Invoice } from '../../../shared/models/Invoice.model';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrl: './invoice-preview.component.scss'
})
export class InvoicePreviewComponent implements OnInit {
  public invoice!: Invoice;
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoice = this.invoiceService.invoice;
  }

  goBack(): void {
    history.back();
  }
}
