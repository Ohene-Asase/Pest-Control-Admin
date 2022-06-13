import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../auth/auth.models';
import { Observable } from 'rxjs';
import { WebUtils } from 'src/app/shared/web-utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<User[]>(`${environment.baseApi}/admin/getusers`).toPromise()
  }

  find(id: number) {
    return this.http.get<User>(`${environment.baseApi}/admin/getuser?id=${id}`).toPromise()
  }

  save(user: User) {
    if (user.id) {
      return this.http.put<User>(`${environment.baseApi}/admin/updateuser`, user).toPromise()
    } else {
      return this.http.post<User>(`${environment.baseApi}/admin/createuser`, user).toPromise()
    }
  }

  query(filter: any) {
    return this.http.get<User[]>(`${environment.baseApi}/admin/queryusers?${this.getQueryString(filter)}`).toPromise();
  }

  stats() {
    return this.http.get<any>(`${environment.baseApi}/admin/userstats`).toPromise()
  }

  delete(username: string) {
    return this.http.delete<boolean>(`${environment.baseApi}/admin/deleteuser?username=${username}`).toPromise()
  }

  search(term: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseApi}/admin/search?term=${term}`)
  }

  protected getQueryString(filter: object) {
    filter = WebUtils.refactorObj(filter);
    let queryString = Object.keys(filter).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(filter[key])
    }).join('&');

    return queryString;
  }
}
