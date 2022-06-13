import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { SharedModule } from '../shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { GenericLookupComponent } from './generic-lookup/generic-lookup.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        CustomFormsModule,
        ReactiveFormsModule,
        SettingRoutingModule,
        NgSelectModule,
        BlockUIModule.forRoot()
    ],
    declarations: [
        SettingComponent,
        GenericLookupComponent
    ]
})
export class SettingModule { }
