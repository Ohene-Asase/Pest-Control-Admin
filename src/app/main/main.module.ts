import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainContainerComponent } from './main-container/main-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { BlockUIModule } from 'ng-block-ui';
import { CustomFormsModule } from 'ngx-custom-validators';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
// import { AdminModule } from '../admin/admin.module';
// import { ReportsModule } from '../reports/reports.module';


@NgModule({
  declarations: [
    MainContainerComponent,
    // DashboardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    // AdminModule,
    // ReportsModule,
    MainRoutingModule,
    BlockUIModule.forRoot()
  ]
})
export class MainModule { }
