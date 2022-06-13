import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from '../routing/route-guard.service';
import { AppRouteNames, Privileges } from '../shared/config-keys';
import { SettingComponent } from './setting.component';
import { GenericLookupComponent } from './generic-lookup/generic-lookup.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    // canActivate: [RouteGuard],
    // data: { authorize: Privileges.Setting },
    children: [
      {
        path: AppRouteNames.GenericSettings,
        component: GenericLookupComponent,
        // canActivate: [RouteGuard],
        // data: { authorize: Privileges.Setting }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class SettingRoutingModule { }
