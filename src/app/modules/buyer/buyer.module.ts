import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerComponent } from './buyer.component';
import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerHomeComponent } from './buyer-home/buyer-home.component';
import { PostRequirmentComponent } from './post-requirment/post-requirment.component';
import { BuyerVerificatonComponent } from './buyer-verificaton/buyer-verificaton.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BuyerHomeFilterComponent } from './buyer-home/buyer-home-filter/buyer-home-filter.component';
import { AdvanceFilterComponent } from './advance-filter/advance-filter.component';
import { BuyerHomeUnlogComponent } from './buyer-home-unlog/buyer-home-unlog.component';
import { ShellModule } from '../shell/shell.module';
import { BuyerResolver } from './buyer-resolver';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
@NgModule({
  imports: [
    CommonModule,
    BuyerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ToastModule,
    MatDialogModule,
    ShellModule,
    DropdownModule
  ],
  declarations: [BuyerComponent, BuyerHomeComponent, PostRequirmentComponent, BuyerVerificatonComponent, BuyerHomeFilterComponent, AdvanceFilterComponent,
    BuyerHomeUnlogComponent],
  providers: [BuyerResolver, MessageService]
})
export class BuyerModule { }
