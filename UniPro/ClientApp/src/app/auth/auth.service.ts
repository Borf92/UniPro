import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

import { LoginModel } from '../auth/login/login.model';
import { AuthDataModel } from '../auth/authData.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _authDataModel: AuthDataModel;
  private _baseUrl: string;

  constructor(private http: HttpClient, private router: Router, @Inject('BASE_URL') baseUrl: string) {
    this._authDataModel = new AuthDataModel();
    this._baseUrl = baseUrl;
  }
  private _clearAuthData() {
    localStorage.remove('authorizationData');
    this._authDataModel = new AuthDataModel();
  }

  public login(model: LoginModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'No-Auth': 'True'
      })
    };
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'ECM');
    body.set('client_secret', 'ECM');
    body.set('username', model.userName);
    body.set('password', model.password);
    return this.http.post(this._baseUrl + 'api/auth/get', body.toString(), httpOptions)
      .subscribe((response: any) => {
        // this.router.navigate(['profile']);
        localStorage.set('authorizationData', {
          token: response.data.access_token,
          userName: model.userName,
          userRole: response.data.userRole,
          userId: response.data.userId,
          refreshToken: response.data.refresh_token
        });

      });
  }

  logout() {
    localStorage.removeItem('token');
  }
  fillAuthData() { }
  authentication() { }
  autoLogin() { }
  refreshToken() {
    const httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + 'my-auth-token'
      })
    };
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', 'ECM');
    body.set('client_secret', 'ECM');
    body.set('refresh_token', '');

    this.http.post(this._baseUrl + 'api/token', null, httpOptionss)
      .subscribe((response: any) => {
        // this.router.navigate(['profile']);
        localStorage.set('authorizationData', {
          token: response.data.access_token,
          refreshToken: response.data.refresh_token
        });
      });
  }
}
