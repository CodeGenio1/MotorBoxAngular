import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { SellerAboutComponent } from './seller-about/seller-about.component';
import { SellerContactComponent } from './seller-contact/seller-contact.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
const routes: Routes = [
  { path: 'seller-registration', component: SellerRegistrationComponent },
  { path: 'seller-dashboard', component: SellerDashboardComponent },
  { path: 'seller-home', component: SellerHomeComponent },
  { path: 'contact-us', component: SellerContactComponent },
  { path: 'about-us', component: SellerAboutComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'user-profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
