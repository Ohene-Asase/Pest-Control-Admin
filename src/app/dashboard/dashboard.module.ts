import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BlockUIModule.forRoot()
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
