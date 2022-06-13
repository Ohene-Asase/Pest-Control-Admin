import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutesModule } from './routing/app-routes.module';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth-interceptor';
import { BlockUIModule } from 'ng-block-ui';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UnauthorizedPageComponent } from './shared/unauthorized-page.component';
import { LoadingTemplate } from './shared/loading-template';
import { ReportsModule } from './reports/reports.module';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UnauthorizedPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    // DashboardModule,
    // SettingModule,
    // ProfileModule,
    MainModule,
    AppRoutesModule,
    HttpClientModule,
    BlockUIModule.forRoot({ template: LoadingTemplate })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
