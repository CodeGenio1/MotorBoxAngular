import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShellModule } from './../shell/shell.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { TransparentHeaderComponent } from './transparent-header/transparent-header.component';
import { PackagesComponent } from './packages/packages.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { SubscriptionInformationComponent } from './subscription-information/subscription-information.component';
import { SingleCarComponent } from './single-car/single-car.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ShellModule,
    MainRoutingModule,
    MatDialogModule
  ],
  declarations: [MainComponent,HomeComponent,TransparentHeaderComponent,PackagesComponent,MainFooterComponent,SubscriptionInformationComponent,SingleCarComponent]
})
export class MainModule { }
