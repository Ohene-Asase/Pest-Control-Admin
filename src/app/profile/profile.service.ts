import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/auth.models';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient) { }

    getAccount() {
        return this.http.get<User>(`${environment.baseApi}/auth/userprofile`).toPromise()
    }

    updateAccount(user: User) {
        return this.http.put<User>(`${environment.baseApi}/auth/updateuserprofile`, user).toPromise()
    }

    changePassword(params: IChangePasswordParams) {
        return this.http.put<boolean>(`${environment.baseApi}/auth/changepassword`, params).toPromise()
    }

    updateUserSettings() {
        //Todo: 
    }
}

export interface IChangePasswordParams {
    currentPassword: string
    newPssword: string
    confirmPassword: string
}
