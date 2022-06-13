import { Injectable } from '@angular/core';
import { LookUpStores, AppRouteNames } from '../shared/config-keys';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { findWhere } from "underscore";
import { WebUtils } from '../shared/web-utils';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http: HttpClient) { }

  fetch(storeName: string) {
    let lookUp = this.getModel(storeName)
    return this.http.get<any[]>(`${environment.baseApi}/${lookUp.api || lookUp.name}`);
  }

  fetchEnum(name: string) {
    return this.http.get<Enum[]>(`${environment.baseApi}/enums/getlist?name=${name}`).toPromise();
  }

  fetchNow(storeName: string) {
    let lookUp = this.getModel(storeName)
    return this.http.get<any[]>(`${environment.baseApi}/${lookUp.api || lookUp.name}`).toPromise();
  }

  save(name: string, record: any) {
    const data = WebUtils.refactorObj(record);
    if (record.id) { return this.http.put<number>(`${environment.baseApi}/${name}`, data).toPromise(); }
    else { return this.http.post<number>(`${environment.baseApi}/${name}`, data).toPromise(); }
  }

  delete(name: string, id: number) {
    return this.http.delete<string>(`${environment.baseApi}/${name}/${id}`).toPromise();
  }

  private getModel(name: string) {
    return findWhere(LookUps.Models, { name })
  }

}

export interface Enum {
  label: string
  value: string
}

export interface LookUpModel {
  name: string
  label: string
  route: string
  store: string
  api?: string
  privilege?: string
  hidden: boolean
}

export class LookUps {
  static get Models(): Array<LookUpModel> {
    return [
      { label: "Users", name: "user", store: LookUpStores.Users, route: AppRouteNames.GenericSettings, hidden: true },
      // { label: "App Setting", name: "appsetting", store: "appsetting", route: Routes.GenericSettings, hidden: false }
    ]
  };
}