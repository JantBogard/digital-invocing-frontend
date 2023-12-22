import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Invoice } from '../../../shared/models/Invoice.model';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InvoiceService } from '../../invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../../../core/components/loader/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { InvoiceModalComponent } from '../invoice-modal/invoice-modal.component';
import { ConfirmDeleteDialogComponent } from '../../../shared/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { CustomerService } from '../../../manage-customer/customer.service';
import { AddressService } from '../../../manage-address/address.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['invoiceNumber', 'customer', 'items', 'billingAddress', 'totalAmount', 'actions'];
  dataSource!: MatTableDataSource<Invoice>;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private invoiceService: InvoiceService,
    private matDialog: MatDialog,
    private loaderService: LoaderService,
    private snackbar: MatSnackBar,
    private customerService: CustomerService,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.route.snapshot.data['invoices']);
    this.loaderService.hide();
    this.getAddress();
    this.getCustomer();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData(): void {
    this.loaderService.show();
    this.invoiceService.getAll().pipe(
      tap(data => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loaderService.hide();
      })
    ).subscribe();
  }

  getCustomer(): void {
    this.loaderService.show();
    this.customerService.getAll().pipe(
      tap(customers => {
        this.customerService.customers = customers;
        this.loaderService.hide();
      })
    ).subscribe();
  }

  getAddress(): void {
    this.loaderService.show();
    this.addressService.getAll().pipe(
      tap(address => {
        this.addressService.addressList = address;
        this.loaderService.hide();
      })
    ).subscribe();
  }

  // Filter data function
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddFormDialog(): void {
    const dialogRef = this.matDialog.open(InvoiceModalComponent);

    dialogRef.afterClosed().subscribe(
      (invoice: Invoice) => {
        if (invoice) {
          this.addInvoice(invoice);
        }
      }
    )
  }

  addInvoice(invoice: Invoice) {
    this.loaderService.show();

    this.invoiceService.add(invoice).pipe(
      tap((response) => {
        this.loaderService.hide();
        this.getData();
      }),
      catchError(error => {
        this.loaderService.hide();
        this.snackbar.open(error.message, 'error');
        return of(`We have an error: ${error}`);
      })
    ).subscribe();
  }

  openUpdateFormDialog(invoice: Invoice): void {
    const dialogRef = this.matDialog.open(InvoiceModalComponent, {
      data: invoice
    });

    dialogRef.afterClosed().subscribe(
      (invoiceUpdate: Invoice) => {
        if (invoiceUpdate) {
          this.updateInvoice(invoice.id, invoiceUpdate);
        }
      }
    )
  }
  updateInvoice(id: number, invoiceUpdate: Invoice) {
    this.loaderService.show();

    this.invoiceService.update(id, invoiceUpdate).pipe(
      tap((response) => {
        this.loaderService.hide();
        this.getData();
      }),
      catchError(error => {
        this.loaderService.hide();
        this.snackbar.open(error.message, 'error');
        return of(`We have an error: ${error}`);
      })
    ).subscribe();
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent, { data: 'You really want to delete this invoice ?' });

    dialogRef.afterClosed().subscribe(
      (response: boolean) => {
        this.loaderService.show();
        if (response) {
          this.invoiceService.delete(id).pipe(
            tap((res) => {
              this.loaderService.hide();
              console.log(res);
            }),
            catchError((error) => {
              this.loaderService.hide();
              this.snackbar.open(error.message, 'error');
              return of(error);
            })
          ).subscribe();
        }
      }
    )
  }

  preview(invoice: Invoice): void {
    this.invoiceService.invoice = invoice;
    this.router.navigateByUrl('/invoice-preview');
  }
}
