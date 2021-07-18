import { SellerComponent } from './seller.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { SellerResolver } from './seller-resolver';
const routes: Routes = [
  {
    path: 'seller', component: SellerComponent, children: [
      { path: 'seller-registration', component: SellerRegistrationComponent },
      { path: 'seller-registration/:id', component: SellerRegistrationComponent, resolve: { data: SellerResolver } },
      { path: 'seller-dashboard', component: SellerDashboardComponent, resolve: { data: SellerResolver } },
      { path: 'seller-home', component: SellerHomeComponent, resolve: { data: SellerResolver } },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'seller-home'
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
