import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../../../shared/models/Customer.model';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from '../../customer.service';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../../../core/components/loader/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { ConfirmDeleteDialogComponent } from '../../../shared/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { AddressService } from '../../../manage-address/address.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'actions'];
  dataSource!: MatTableDataSource<Customer>;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private matDialog: MatDialog,
    private loaderService: LoaderService,
    private snackbar: MatSnackBar,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.route.snapshot.data['customers']);
    this.loaderService.hide();
    this.getAddress();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData(): void {
    this.loaderService.show();
    this.customerService.getAll().pipe(
      tap((data) => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loaderService.hide();
      })
    ).subscribe()
  }

  // Filter data function
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  openAddFormDialog(): void {
    const dialogRef = this.matDialog.open(CustomerModalComponent);

    dialogRef.afterClosed().subscribe(
      (customer: Customer) => {
        if (customer) {
          this.addCustomer(customer);
        }
      }
    )
  }

  openUpdateFormDialog(customer: Customer): void {
    const dialogRef = this.matDialog.open(CustomerModalComponent, {
      data: customer
    });

    dialogRef.afterClosed().subscribe(
      (customerUpdate: Customer) => {
        if (customerUpdate) {
          this.updateCustomer(customer.id, customerUpdate);
        }
      }
    )
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent, { data: 'You really want to delete this customer ?' });

    dialogRef.afterClosed().subscribe(
      (response: boolean) => {
        this.loaderService.show();
        if (response) {
          this.customerService.delete(id).pipe(
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

  addCustomer(customer: Customer): void {
    this.loaderService.show();

    this.customerService.add(customer).pipe(
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

  updateCustomer(id: number, customerUpdate: Customer): void {
    this.loaderService.show();

    this.customerService.update(id, customerUpdate).pipe(
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
}
