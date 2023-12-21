import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';



@NgModule({
  declarations: [ConfirmDeleteDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    //Component
    ConfirmDeleteDialogComponent,

    //Module
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
