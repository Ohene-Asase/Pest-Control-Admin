import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteNames } from '../shared/config-keys';
import { ProfileComponent } from './profile.component';
import { RouteGuard } from '../routing/route-guard.service';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canLoad: [RouteGuard],
        children: [
            { path: AppRouteNames.ProfileAccount, component: ProfileAccountComponent, canActivate: [RouteGuard] },
            { path: AppRouteNames.ProfileSetting, component: ProfileSettingComponent, canActivate: [RouteGuard] },
            { path: AppRouteNames.ChangePassword, component: ChangePasswordComponent, canActivate: [RouteGuard] },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [RouteGuard]
})
export class ProfileRoutingModule { }
