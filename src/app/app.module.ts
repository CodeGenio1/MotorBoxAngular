import { TokenInterceptor } from './services/interceptors/token.interceptors';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationRoutingModule } from './authentication/authentication-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared-module/shared-module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InterceptorService } from './services/interceptors/spinner.service';
import { MatProgressSpinnerModule } from '@angular/material';
import { CarService } from './services/car.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    AuthenticationRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ProgressSpinnerModule,
    SharedModule,
    MatProgressSpinnerModule
  ],
  providers: [
    CarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
