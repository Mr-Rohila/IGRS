import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthBaseTemplateComponent } from './components/auth-base-template/auth-base-template.component';
import { RegisterComponent } from './components/register/register.component';
import { CreatePasswordComponent } from './components/create-password/create-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthBaseTemplateComponent,
    children: [
      {
        path: '',
        redirectTo: 'login'
      },
      
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'create-password',
        component: CreatePasswordComponent
      }
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
