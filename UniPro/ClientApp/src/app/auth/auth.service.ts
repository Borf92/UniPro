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
  private _clientIssuer: string;
  private _clientAudience: string;
  private _clientSecret: string;

  constructor(private http: HttpClient, private router: Router, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._clientIssuer = 'UniPro';
    this._clientAudience = 'UniPro';
    this._clientSecret = 'superSecretKey@345superSecretKey@345superSecretKey@345';
  }

  private _clearAuthData() {
    localStorage.removeItem('authorizationData');
  }

  private _setAuthData(model: LoginModel, responseData) {
    let userData: AuthDataModel = new AuthDataModel();

    userData.Token = responseData.access_token;
    userData.UserName = model.UserName;
    userData.UserRole = responseData.userRole;
    userData.UserId = responseData.userId;
    userData.RefreshToken = responseData.refresh_token;
    userData.IsAuth = true;
    const authData = JSON.stringify(userData);
    localStorage.setItem('authorizationData', authData);
  }

  private _getUserData(): AuthDataModel {
    let userData: AuthDataModel = new AuthDataModel();
    const data = JSON.parse(localStorage.getItem('authorizationData'));
    if (data != null) {
      userData.Token = data._token;
      userData.UserId = data._userId;
      userData.UserName = data._userName;
      userData.UserRole = data._userRole;
      userData.IsAuth = data._isAuth;
      userData.RefreshToken = data._refreshToken;
    } else {
      userData.IsAuth = false;
    }

    return userData;
  }

  public isAuth(): boolean {
    let userData = this._getUserData();
    return userData.IsAuth;
  }

  public getToken(): string {
    let userData = this._getUserData();
    return userData.Token;
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
    body.set('client_issuer', this._clientIssuer);
    body.set('client_audience', this._clientAudience);
    body.set('client_secret', this._clientSecret);
    body.set('username', model.UserName);
    body.set('password', model.Password);
    return this.http.post(this._baseUrl + 'api/auth/get', body.toString(), httpOptions)
      .subscribe((response: any) => {
        this._setAuthData(model, response);
        this.router.navigate(['/']);
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
    let userData = this._getUserData();
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_issuer', this._clientIssuer);
    body.set('client_audience', this._clientAudience);
    body.set('client_secret', this._clientSecret);
    body.set('refresh_token', userData.RefreshToken);

    this.http.post(this._baseUrl + 'api/auth/refresh', body.toString(), httpOptionss)
      .subscribe((response: any) => {
        userData.Token = response.access_token;
        userData.RefreshToken = response.refresh_token;
        localStorage.setItem('authorizationData', JSON.stringify(userData));
      }, (error: any) => {
        if (error.status === 401) {
          this._clearAuthData();
          console.log('Токен истек');
        } else {
          console.log('Ошибка продления токена');
        }
      });
  }
}
