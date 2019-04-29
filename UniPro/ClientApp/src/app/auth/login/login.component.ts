import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

import { faKey, faAt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faKey = faKey;
  faAt = faAt;
  email = '';
  password = '';

  constructor(private authService: AuthService) { }
  Login() {
    console.log('you are logging in');
    this.authService.login(this.email, this.password);

  }

  ngOnInit() { }

}
