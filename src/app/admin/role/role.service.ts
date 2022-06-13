import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Role } from '../../auth/auth.models';
import { BaseService } from 'src/app/shared/base_service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<Role> {

  constructor(http: HttpClient) { super(http, 'profiles') }

  getPrivilegs() {
    return this.http.get<string[]>(`${environment.baseApi}/admin/getprivileges`).toPromise();
  }

}
