import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = 'http://localhost:44323/api';
  token: string;

  constructor(private http: HttpClient,  private router: Router,) { }
  login(email: string, password: string) {
    this.http.post(this.api + '/auth/login', { UserName: email, Password: password })
      .subscribe((resp: any) => {

        this.router.navigate(['profile']);
        localStorage.setItem('auth_token', resp.token);

      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
