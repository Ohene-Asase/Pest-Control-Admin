import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '../routing/route-guard.service';
import { AppRouteNames, Privileges } from '../shared/config-keys';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    // canActivate: [RouteGuard],
    // data: { authorize: Privileges.Administration }
  },
  {
    path: 'roles',
    component: RoleComponent,
    // canActivate: [RouteGuard],
    // data: { authorize: Privileges.Administration }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AdminRoutingModule { }
