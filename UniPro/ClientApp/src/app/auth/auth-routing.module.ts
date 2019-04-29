import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthComponent } from './auth.component';
import { ChangeComponent } from './change/change.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { RestoreComponent } from './restore/restore.component';
import { RegistrationComponent } from './registration/registration.component';

const authRoutes: Routes = [
   {
     path: 'auth',
     component: AuthComponent,
     children: [
      {
        path: 'change',
        component: ChangeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'reset',
        component: ResetComponent
      },
      {
        path: 'restore',
        component: RestoreComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
   }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
