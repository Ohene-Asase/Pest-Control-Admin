import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppRouteNames } from '../shared/config-keys';
import { contains } from "underscore";
import { Observable } from 'rxjs';

@Injectable()
export class RouteGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //let url: string = state.url;

    return this.checkLogin(route);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {

    return this.checkLogin(route);
  }

  checkLogin(route: any): boolean {
    const routeName = route.url[0]?.path || route.path;
    const ignore = contains([AppRouteNames.Expired, AppRouteNames.Login, AppRouteNames.Subscription], routeName);

    if (routeName == AppRouteNames.Login) {
      if (this.authService.isLoggedIn()) {
        this.router.navigate([`/main/${AppRouteNames.Dashboard}`]);
        return false;
      } else {
        return true;
      }
    }

    if (ignore) { return true }

    if (this.authService.isLoggedIn()) {
      //Todo: Check expired session
      let permissionToView = route.data.authorize
      if (permissionToView) {
        if (this.authService.isAuthorize(permissionToView)) {
          return true
        } else {
          this.router.navigate([AppRouteNames.UnAuthorized])
          return false
        }
      } else {
        return true;
      }
    }

    //store the attempted URL for redirecting
    //this.authService.redirectUrl = route.url;

    // Navigate to the login page with extras
    this.router.navigate([AppRouteNames.Login]);
    return false;
  }
}