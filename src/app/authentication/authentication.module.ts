import { NgModule } from '@angular/core';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthBaseTemplateComponent } from './components/auth-base-template/auth-base-template.component';
import { RegisterComponent } from './components/register/register.component';
import { CreatePasswordComponent } from './components/create-password/create-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    LoginComponent,
    AuthBaseTemplateComponent,
    RegisterComponent,
    CreatePasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
