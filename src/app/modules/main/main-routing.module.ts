import { PackagesResolver } from './packages/packages-resolver';
import { MainComponent } from './main.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackagesComponent } from './packages/packages.component';
import { SubscriptionInformationComponent } from './subscription-information/subscription-information.component';
import { SingleCarComponent } from './single-car/single-car.component';
import { MainResolver } from './main-resolver';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SellerResolver } from '../seller/seller-resolver';
import { AuthGuard } from 'src/app/services/auth.guard';
const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', component: HomeComponent, resolve: { data: MainResolver } },
      { path: 'home', component: HomeComponent, resolve: { data: MainResolver } },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
      { path: 'packages', component: PackagesComponent, resolve: { data: PackagesResolver } },
      { path: 'single-car/:id', component: SingleCarComponent, canActivate: [AuthGuard] },
      { path: 'single-car/:id/:sellerId', component: SingleCarComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'subscription-information', component: SubscriptionInformationComponent ,canActivate: [AuthGuard]},



  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
