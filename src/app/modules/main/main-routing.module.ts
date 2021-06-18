import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackagesComponent } from './packages/packages.component';
import { SubscriptionInformationComponent } from './subscription-information/subscription-information.component';
import { SingleCarComponent } from './single-car/single-car.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'subscription-information', component: SubscriptionInformationComponent },
  { path: 'single-car', component: SingleCarComponent },
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
