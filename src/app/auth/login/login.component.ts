import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppRouteNames, StoreKeys } from '../../shared/config-keys';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LoginParams } from '../auth.models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginParams = <LoginParams>{};
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login(credentials: LoginParams) {
    try {
      this.loading = true;
      let userData = await this.authService.login(credentials);

      if (!userData) return;
      this.authService.setUser(userData);
      this.authService.announceLogin(true);
      let routeAddress = userData.view ? AppRouteNames[userData.view] : AppRouteNames.Dashboard;
      localStorage.setItem(StoreKeys.DefaultView, `main/${routeAddress}`);
      this.router.navigate(['/main/dashboard']);
    } catch (error) { } finally { this.loading = false; }
  }

}
