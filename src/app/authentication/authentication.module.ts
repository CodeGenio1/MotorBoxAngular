import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ForgetComponent } from './forget/forget.component';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PasswordResetComponent } from './password-reset/password-reset.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    RouterModule,
    ToastModule,
    FormsModule
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
    ForgetComponent,
    PasswordResetComponent
  ],
  providers:[MessageService]
})
export class AuthenticationModule { }
