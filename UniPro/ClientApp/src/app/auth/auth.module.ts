import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { ChangeComponent } from './change/change.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { RestoreComponent } from './restore/restore.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AuthComponent,
    ChangeComponent,
    LoginComponent,
    ResetComponent,
    RestoreComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    FontAwesomeModule
  ]
})
export class AuthModule { }
