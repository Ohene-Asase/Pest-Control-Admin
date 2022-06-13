import { tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { StoreKeys } from './config-keys';
import { values, flatten, isString } from "underscore";
import { AuthService } from '../auth/auth.service';
import { ToastService } from './toast.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private toast: ToastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    const token: string = localStorage.getItem(StoreKeys.Token);
    let authReq = req.clone();
    if (token) {
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${atob(token)}` } });
    }

    return next.handle(authReq).pipe(
      tap((response: HttpResponse<any>) => {
        let modelTitle: string;
        const headers = response.headers;
        if (headers) {
          modelTitle = response.headers.get('x-model-title');
          const totalRecords = response.headers.get('x-total-records');
          if (totalRecords) sessionStorage.setItem(StoreKeys.TotalRecords, totalRecords);
        }

        switch (response.status) {
          case 201: //Created
            this.toast.success(`${modelTitle || 'Data'} saved successfully.`);
            break;
          case 200: //Success
            switch (req.method) {
              case 'PUT':
                this.toast.success(`${modelTitle || 'Record'} updated successfully`);
                break;
              case 'DELETE':
                this.toast.success(`${modelTitle || 'Data'} deleted successfully.`);
              default:
                // this.toast.clear();
                break;
            }
          default:
            break;
        }
        if (response.status === 200 && req.method !== 'GET' && !response.url.endsWith('query')) {
          // console.log(response)
          // Toast.success(response.body.success);
        }
      }, err => {
        switch (err.status) {
          case 401: //Unauthorized
            const isLogin = this.authService.isLoggedIn()
            if (isLogin) {
              setTimeout(() => {
                this.toast.error("Session expired. Please login", "Authentication")
                this.authService.logout()
                location.reload()
              }, 400);
            } else {
              const info = err.error.includes("Token has been sent to");
              if (info) this.toast.info(err.error)
              else this.toast.error(err.error, "Login Error")
            }
            break;
          case 403: //Forbidden
            this.toast.error("You are not authorized to perform this action. Contact your administrator.", "Access Error")
            break;
          case 400: //Bad Request
            const info = isString(err.error) ? err.error.includes("code already sent") : false;
            if (info) this.toast.info(err.error);
            else this.toast.error(this.refactorError(err));
            break;
          case 404: //Not Found
            this.toast.error("Resource doesn't exist.")
            break;
          case 500:  //Internal Server Error
            this.toast.error(err.error)
            break;
          case 504:  //Gatway Timeout
            this.toast.error("Unable to establish connection to the server. Kindly check your connectivity.", "Connection Error")
            break;
          default:
            this.toast.error(err.statusText)
            break;
        }
      })
    );
  }

  private refactorError(err: any): string {
    if (err.error) {
      if (err.error.errors) {
        let errors: string[] = flatten(values(err.error.errors))
        return errors.join('\n')
      } else {
        return err.error;
      }
    }
    else if (err.message) return err.message;
  }

}