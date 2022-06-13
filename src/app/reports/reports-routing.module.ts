import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteNames, Privileges } from '../shared/config-keys';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { RouteGuard } from '../routing/route-guard.service';

const routes: Routes = [
  {
    path: AppRouteNames.Reports,
    component: ReportViewerComponent,
    canActivate: [RouteGuard],
    data: { authorize: Privileges.Report }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
