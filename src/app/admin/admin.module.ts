import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { AdminRoutingModule } from './admin-routing.module';
import { BlockUIModule } from 'ng-block-ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgSelectModule,
    BlockUIModule.forRoot()
  ],
  declarations: [
    RoleComponent,
    UserComponent,
  ]
})
export class AdminModule { }
