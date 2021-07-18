import { SellerResolver } from './../seller/seller-resolver';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShellModule } from './../shell/shell.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { TransparentHeaderComponent } from './transparent-header/transparent-header.component';
import { PackagesComponent } from './packages/packages.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { SubscriptionInformationComponent } from './subscription-information/subscription-information.component';
import { SingleCarComponent } from './single-car/single-car.component';
import { MatDialogModule } from '@angular/material';
import { MainResolver } from './main-resolver';
import { GalleriaModule } from 'primeng/galleria';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ToastModule } from 'primeng/toast';
import { AboutUsComponent } from './about-us/about-us.component';
import { PackagesResolver } from './packages/packages-resolver';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ShellModule,
    MainRoutingModule,
    MatDialogModule,
    GalleriaModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    TransparentHeaderComponent,
    PackagesComponent,
    MainFooterComponent,
    SubscriptionInformationComponent,
    AboutUsComponent,
    SingleCarComponent,
    UserProfileComponent],

  providers: [MainResolver, PackagesComponent, SellerResolver, PackagesResolver]
})
export class MainModule { }
