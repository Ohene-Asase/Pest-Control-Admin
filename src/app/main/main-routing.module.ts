import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuard } from '../routing/route-guard.service';
import { AppRouteNames } from '../shared/config-keys';
import { MainContainerComponent } from './main-container/main-container.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainContainerComponent,
    canActivate: [RouteGuard],
    children: [
      // {
      //   path: AppRouteNames.Dashboard,
      //   component: DashboardComponent,
      //   canActivate: [RouteGuard]
      // },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../setting/setting.module').then(m => m.SettingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
