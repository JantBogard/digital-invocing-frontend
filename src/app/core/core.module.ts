import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    SideBarComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    //components
    SideBarComponent,
    NavBarComponent
  ]
})
export class CoreModule { }
