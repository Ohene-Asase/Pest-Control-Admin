import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from "../shared/page-not-found.component";
import { AppRouteNames } from "../shared/config-keys";
import { RouteGuard } from "./route-guard.service";
import { UnauthorizedPageComponent } from "../shared/unauthorized-page.component";

const appRoutes: Routes = [

  {
    path: '',
    redirectTo: `/main/${AppRouteNames.Dashboard}`,
    pathMatch: 'full'
  },
  {
    path: AppRouteNames.UnAuthorized,
    component: UnauthorizedPageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutesModule { }