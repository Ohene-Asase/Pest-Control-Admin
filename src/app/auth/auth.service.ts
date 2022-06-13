import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StoreKeys } from '../shared/config-keys';
import { User, LoginParams, Role, LoginResponse } from './auth.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { intersection, isObject } from 'underscore';

@Injectable()
export class AuthService {
  currentUser: User
  loggedInSource = new Subject<boolean>()
  loggedIn$ = this.loggedInSource.asObservable()

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {
    let userStoreValue = localStorage.getItem(StoreKeys.CurrentUser)
    if (userStoreValue) this.currentUser = JSON.parse(localStorage.getItem(StoreKeys.CurrentUser))
  }

  login(credentials: LoginParams) {
    return this.http.post<LoginResponse>(`${environment.baseApi}/auth/login`, credentials).toPromise();
  }

  updateUserLocation(locationId: number) {
    return this.http.get<number>(`${environment.baseApi}/auth/updatelocation?locationId=${locationId}`).toPromise();
  }

  setUser(user: LoginResponse) {
    const userData = JSON.parse(atob(user.token.split('.')[1]));

    this.currentUser = <User>{
      username: user.username,
      name: userData.fullName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      role: <Role>{
        name: userData.profile,
        privileges: (isObject(userData.roles)) ? userData.roles : [userData.roles]
      }
    };

    localStorage.setItem(StoreKeys.Token, btoa(user.token))
    localStorage.setItem(StoreKeys.CurrentUser, JSON.stringify(this.currentUser))

  }

  logout(): void {
    this.currentUser = null
    localStorage.removeItem(StoreKeys.CurrentUser)
    localStorage.removeItem(StoreKeys.Token)
  }

  announceLogin(isLoggedIn: boolean) {
    this.loggedInSource.next(isLoggedIn)
  }

  isLoggedIn() { return !!this.currentUser }

  isAuthorize(privilege: string) {
    if (!privilege) return true
    let privs = privilege.split("|")
    let res = intersection(this.currentUser.role.privileges, privs)
    return (res.length > 0)
  }
}