import { ShellModule } from './../shell/shell.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { SellerHeaderComponent } from './seller-header/seller-header.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { SellerFooterComponent } from './seller-footer/seller-footer.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { MatDialogModule } from '@angular/material';
import { ChatComponent } from './chat/chat.component';
import { AddAnAccComponent } from './seller-dashboard/add-an-acc/add-an-acc.component';
import { SellerResolver } from './seller-resolver';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { SendOfferComponent } from './seller-dashboard/send-offer/send-offer.component';
@NgModule({
  imports: [
    CommonModule,
    SellerRoutingModule,
    MatDialogModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ShellModule,
    DropdownModule
  ],
  declarations: [SellerComponent, SellerRegistrationComponent,
    SellerHeaderComponent, SellerDashboardComponent, SellerFooterComponent, SellerHomeComponent, SellerHeaderComponent
    , ChatComponent, AddAnAccComponent, SendOfferComponent],
  providers: [SellerResolver, MessageService]
})
export class SellerModule { }
