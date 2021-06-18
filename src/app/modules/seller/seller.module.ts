import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { SellerHeaderComponent } from './seller-header/seller-header.component';
import { DarkHeaderComponent } from './dark-header/dark-header.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerFooterComponent } from './seller-footer/seller-footer.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { FooterComponent } from './footer/footer.component';
import { SellerContactComponent } from './seller-contact/seller-contact.component';
import { SellerAboutComponent } from './seller-about/seller-about.component';
import { MatDialogModule } from '@angular/material';
import { ChatComponent } from './chat/chat.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddAnAccComponent } from './seller-dashboard/add-an-acc/add-an-acc.component';

@NgModule({
  imports: [
    CommonModule,
    SellerRoutingModule,
    MatDialogModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SellerComponent,SellerRegistrationComponent,
    SellerHeaderComponent,DarkHeaderComponent,SellerDashboardComponent,SellerFooterComponent,SellerHomeComponent,FooterComponent,SellerHeaderComponent,SellerContactComponent,
  SellerAboutComponent,ChatComponent,UserProfileComponent,AddAnAccComponent]
})
export class SellerModule { }
