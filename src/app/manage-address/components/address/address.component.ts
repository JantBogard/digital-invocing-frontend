import { LoaderService } from './../../../core/components/loader/loader.service';
import { AddressService } from './../../address.service';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Address } from '../../../shared/models/Address.model';
import { catchError, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddressModalComponent } from '../address-modal/address-modal.component';
import { ConfirmDeleteDialogComponent } from '../../../shared/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { ModalAction } from '../../../shared/modalAction';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['street', 'city', 'state', 'zipCode', 'country', 'actions'];
  dataSource!: MatTableDataSource<Address>;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private addressService: AddressService,
    private matDialog: MatDialog,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.route.snapshot.data['addressList']);
    this.loaderService.hide();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData() {
    this.loaderService.show()
    this.addressService.getAll().pipe(
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

  openAddFormDialog(): void {
    const dialogRef = this.matDialog.open(AddressModalComponent);

    dialogRef.afterClosed().subscribe(
      (address: Address) => {
        this.addAddress(address);
      }
    )
  }

  openUpdateFormDialog(address: Address): void {
    const dialogRef = this.matDialog.open(AddressModalComponent, {
      data: address
    });

    dialogRef.afterClosed().subscribe(
      (addressUpdate: Address) => {
        this.updateAddress(address.id, addressUpdate);
      }
    )
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent, { data: 'You really want to do this ?' });

    this.loaderService.show();
    dialogRef.afterClosed().subscribe(
      (response: boolean) => {
        if (response) {
          this.addressService.delete(id).pipe(
            tap((res) => {
              this.loaderService.hide();
              console.log(res);
            }),
            catchError((error) => {
              this.loaderService.hide();
              return of(error)
            })
          ).subscribe()
        }
      }
    )
  }

  addAddress(address: Address): void {

    this.loaderService.show();
    this.addressService.add(address).pipe(
      tap((response) => {
        this.dataSource.data.reverse();
        this.dataSource.data.push(response);
        this.dataSource.data.reverse();
        this.loaderService.hide();
      }),
      catchError(error => {
        this.loaderService.hide();
        console.error(error);
        return of(`We have an error: ${error}`)
      })
    ).subscribe();
  }

  updateAddress(id: number, address: Address): void {
    this.loaderService.show();
    this.addressService.update(id, address).pipe(
      tap((response) => {
        this.dataSource.data.forEach(
          elt => {
            if (elt.id == id) {
              elt = response
            }
          }
        )
      }),
      catchError(error => {
        this.loaderService.hide();
        return of(`We have an error: ${error}`)
      })
    ).subscribe();
  }

}
