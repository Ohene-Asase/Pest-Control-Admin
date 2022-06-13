import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from '../routing/route-guard.service';
import { AppRouteNames } from '../shared/config-keys';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: AppRouteNames.Login,
    component: LoginComponent,
    canActivate: [RouteGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AuthRoutingModule { }
