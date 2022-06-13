import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { BlockUIModule } from 'ng-block-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        CustomFormsModule,
        ReactiveFormsModule,
        ProfileRoutingModule,
        BlockUIModule.forRoot()
    ],
    declarations: [
        ProfileComponent,
        ChangePasswordComponent,
        ProfileSettingComponent,
        ProfileAccountComponent,
    ]
})
export class ProfileModule { }
