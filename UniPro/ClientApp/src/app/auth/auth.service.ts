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
  private _baseUrl: string;

  constructor(private http: HttpClient, private router: Router, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  private _clearAuthData() {
    localStorage.removeItem('authorizationData');
  }

  private _setAuthData(model: LoginModel, responseData) {
    localStorage.setItem('authorizationData', {
      token: responseData.access_token,
      userName: model.UserName,
      userRole: responseData.userRole,
      userId: responseData.userId,
      refreshToken: responseData.refresh_token
    });
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
    body.set('username', model.UserName);
    body.set('password', model.Password);
    return this.http.post(this._baseUrl + 'api/auth/get', body.toString(), httpOptions)
      .subscribe((response: any) => {
        this._setAuthData(model, response);
        this.router.navigate(['/auth/login']);
      }, (error: any) => {
        this._clearAuthData();
        console.log(error);
      });
  }

  public logout() {
    this._clearAuthData();
  }

  public refreshToken() {
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
        localStorage.set('authorizationData', {
          token: response.access_token,
          refreshToken: response.refresh_token
        });
      });
  }

  public getToken(): string {
    return localStorage.getItem('authorizationData')['token'];
  }

  public getUserData(): AuthDataModel {
    const userData: AuthDataModel = new AuthDataModel();
    userData.IsAuth = localStorage.getItem('authorizationData')['token'] !== '';
    userData.UserId = localStorage.getItem('authorizationData')['userId'];
    userData.UserName = localStorage.getItem('authorizationData')['userName'];
    userData.UserRole = localStorage.getItem('authorizationData')['userRole'];

    return userData;
  }
}
