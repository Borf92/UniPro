import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginModel } from '../login/login.model';

import { faKey, faAt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faKey = faKey;
  faAt = faAt;
  model = new LoginModel('', '');
 // submitted = false;

  constructor(private authService: AuthService) { }
  ngOnInit() { }
  onSubmit() {
    // this.submitted = true;
    console.log('you are logging in');
    this.authService.login(this.model);
  }
}
