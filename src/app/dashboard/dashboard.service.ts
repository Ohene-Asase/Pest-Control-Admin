import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public http: HttpClient) { }

  getAppointments():Promise<any>{
    let req = this.http.get(`${environment.baseApi}/appointment`);
   return  lastValueFrom(req);
  }
  approval(id):Promise<any>{
    let req = this.http.get(`${environment.baseApi}/appointment/approval?id=${id}`);
   return  lastValueFrom(req);
  }

  disApproval(id):Promise<any>{
    let req = this.http.get(`${environment.baseApi}/appointment/disapproval?id=${id}`);
   return  lastValueFrom(req);
  }
}
