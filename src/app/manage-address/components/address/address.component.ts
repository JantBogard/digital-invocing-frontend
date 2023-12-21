import { AddressService } from './../../address.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Address } from '../../../shared/models/Address.model';
import { catchError, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddressModalComponent } from '../address-modal/address-modal.component';
import { ConfirmDeleteDialogComponent } from '../../../shared/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { ModalAction } from '../../../shared/modalAction';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
  displayedColumns: string[] = ['street', 'city', 'state', 'zipCode', 'country', 'actions'];
  dataSource!: MatTableDataSource<Address>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private addressService: AddressService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.addressService.getAll().pipe(
      tap((data) => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

    dialogRef.afterClosed().subscribe(
      (response: boolean) => {
        console.log(response);
        if (response) {
          this.addressService.delete(id).pipe(
            tap((res) => {
              console.log(res);
            }),
            catchError((error) => {
              return of(error)
            })
          ).subscribe()
        }
      }
    )
  }

  addAddress(address: Address): void {

    this.addressService.add(address).pipe(
      tap((response) => {
        this.dataSource.data.reverse();
        this.dataSource.data.push(response);
        this.dataSource.data.reverse();
      }),
      catchError(error => {
        console.error(error);
        return of(`We have an error: ${error}`)
      })
    ).subscribe();
  }

  updateAddress(id: number, address: Address): void {
    this.addressService.update(id, address);
  }

}
